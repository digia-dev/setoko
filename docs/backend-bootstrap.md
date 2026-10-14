# Setoko Backend Bootstrap

This project is a minimal backend starter for the Setoko MVP using NestJS + TypeScript.

## 1) Package setup

Create `package.json`:
```json
{
  "name": "setoko-backend",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:debug": "nest start --debug --watch",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/config": "^3.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/jwt": "^10.0.0",
    "@nestjs/passport": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/swagger": "^7.0.0",
    "bcrypt": "^5.4.0",
    "class-transformer": "^0.14.0",
    "class-validator": "^0.14.0",
    "passport": "^0.0.0",
    "passport-jwt": "^4.0.0",
    "pg": "^8.0.0",
    "reflect-metadata": "^0.10.0",
    "rxjs": "^7.0.0",
    "uuid": "^9.0.0"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/bcrypt": "^5.4.0",
    "@types/express": "^4.0.0",
    "@types/jest": "^29.0.0",
    "@types/node": "^20.0.0",
    "@types/passport-jwt": "^3.0.0",
    "eslint": "^8.0.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^8.0.0",
    "jest": "^29.0.0",
    "prettier": "^3.0.0",
    "ts-jest": "^29.0.0",
    "ts-node": "^10.0.0",
    "typescript": "^5.0.0"
  }
}
```

Create `.eslintrc.js`, `.prettierrc`, `tsconfig.json`, `nest-cli.json`, `.gitignore` as standard NestJS defaults.

---

## 2) Main application bootstrap

Create `src/main.ts`:
```ts
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Setoko API')
    .setDescription('API for Setoko SaaS store management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
```

---

## 3) App module

Create `src/app.module.ts`:
```ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { PublicModule } from './public/public.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    StoresModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    PublicModule,
  ],
})
export class AppModule {}
```

---

## 4) Shared types and utilities

### `src/common/types/user-request.type.ts`
```ts
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}
```

### `src/common/guards/jwt-auth.guard.ts`
```ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### `src/common/decorators/user.decorator.ts`
```ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

---

## 5) Auth module

### `src/auth/auth.module.ts`
```ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
```

### `src/auth/auth.service.ts`
```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  private readonly users = [
    {
      id: 'demo-user-id',
      email: 'owner@example.com',
      passwordHash: bcrypt.hashSync('P@ssw0rd123', 10),
      fullName: 'Demo Owner',
    },
  ];

  async register(dto: { email: string; password: string; full_name?: string; phone?: string }) {
    const exists = this.users.some((u) => u.email === dto.email);

    if (exists) {
      throw new UnauthorizedException('Email already registered');
    }

    const user = {
      id: randomUUID(),
      email: dto.email,
      passwordHash: await bcrypt.hash(dto.password, 10),
      fullName: dto.full_name || 'New User',
      phone: dto.phone || null,
    };

    this.users.push(user);

    const token = this.signToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName,
        phone: user.phone,
      },
      token,
    };
  }

  async login(dto: { email: string; password: string }) {
    const user = this.users.find((u) => u.email === dto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await bcrypt.compare(dto.password, user.passwordHash);

    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.signToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        full_name: user.fullName,
      },
      token,
    };
  }

  async validateUser(userId: string) {
    const user = this.users.find((u) => u.id === userId);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
    };
  }

  private signToken(userId: string, email: string) {
    return this.jwtService.sign({ sub: userId, email });
  }

  constructor(private readonly jwtService: JwtService) {}
}
```

### `src/auth/auth.controller.ts`
```ts
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { AuthenticatedRequest } from '../common/types/user-request.type';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    body: {
      email: string;
      password: string;
      full_name?: string;
      phone?: string;
    },
  ) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ) {
    return this.authService.login(body);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: { id: string; email: string }) {
    return {
      id: user.id,
      email: user.email,
    };
  }
}
```

### `src/auth/jwt.strategy.ts`
```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'dev-secret',
    });
  }

  async validate(payload: any) {
    const user = await this.authService.validateUser(payload.sub);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
```

---

## 6) Stores module

### `src/stores/stores.module.ts`
```ts
import { Module } from '@nestjs/common';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  controllers: [StoresController],
  providers: [StoresService],
})
export class StoresModule {}
```

### `src/stores/stores.service.ts`
```ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class StoresService {
  private stores = [
    {
      id: 'demo-store-id',
      owner_user_id: 'demo-user-id',
      name: 'Demo Store',
      slug: 'demo-store',
      description: 'Sample storefront',
      logo_url: 'https://example.com/logo.png',
      whatsapp: '081234567890',
      address: 'Jakarta',
      status: 'active',
    },
  ];

  createStore(userId: string, dto: any) {
    const store = {
      id: randomUUID(),
      owner_user_id: userId,
      name: dto.name,
      slug: dto.slug,
      description: dto.description || '',
      logo_url: dto.logo_url || '',
      whatsapp: dto.whatsapp || '',
      address: dto.address || '',
      status: 'draft',
    };

    this.stores.push(store);

    return {
      ...store,
      public_url: `https://${dto.slug}.checkoutaja.com`,
    };
  }

  findByUser(userId: string) {
    return this.stores.filter((store) => store.owner_user_id === userId);
  }

  findBySlug(slug: string) {
    return this.stores.find((store) => store.slug === slug);
  }
}
```

### `src/stores/stores.controller.ts`
```ts
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/user.decorator';
import { StoresService } from './stores.service';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createStore(
    @CurrentUser() user: { id: string },
    @Body()
    dto: {
      name: string;
      slug: string;
      description?: string;
      logo_url?: string;
      whatsapp?: string;
      address?: string;
    },
  ) {
    return this.storesService.createStore(user.id, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMyStores(@CurrentUser() user: { id: string }) {
    return this.storesService.findByUser(user.id);
  }

  @Get(':storeId')
  getStore(@Param('storeId') storeId: string) {
    return {
      id: storeId,
      name: 'Sample Store',
      slug: 'sample-store',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':storeId')
  updateStore(@Param('storeId') storeId: string, @Body() dto: Record<string, any>) {
    return {
      id: storeId,
      ...dto,
    };
  }
}
```

---

## 7) Products module

### `src/products/products.module.ts`
```ts
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
```

### `src/products/products.service.ts`
```ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  private products = [
    {
      id: 'prod-1',
      store_id: 'demo-store-id',
      name: 'Kaos Premium',
      slug: 'kaos-premium',
      price: 149000,
      stock: 12,
      status: 'active',
      description: 'Kaos premium cotton',
    },
  ];

  listProducts(storeId: string) {
    return this.products.filter((p) => p.store_id === storeId);
  }

  createProduct(storeId: string, dto: any) {
    const product = {
      id: randomUUID(),
      store_id: storeId,
      ...dto,
    };

    this.products.push(product);
    return product;
  }
}
```

### `src/products/products.controller.ts`
```ts
import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller('stores/:storeId/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  listProducts(@Param('storeId') storeId: string) {
    return this.productsService.listProducts(storeId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createProduct(@Param('storeId') storeId: string, @Body() dto: Record<string, any>) {
    return this.productsService.createProduct(storeId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':productId')
  updateProduct(@Param('productId') productId: string, @Body() dto: Record<string, any>) {
    return { id: productId, ...dto };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':productId')
  deleteProduct(@Param('productId') productId: string) {
    return { id: productId, deleted: true };
  }
}
```

---

## 8) Orders module

### `src/orders/orders.service.ts`
```ts
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  private orders = [
    {
      id: 'ord-1',
      store_id: 'demo-store-id',
      customer_name: 'Budi Santoso',
      total_amount: 149000,
      status: 'paid',
    },
  ];

  listOrders(storeId: string) {
    return this.orders.filter((o) => o.store_id === storeId);
  }

  createOrder(storeId: string, dto: any) {
    const order = {
      id: randomUUID(),
      store_id: storeId,
      customer_name: dto.customer_name,
      customer_email: dto.customer_email,
      total_amount: 149000,
      status: 'pending',
    };

    this.orders.push(order);
    return order;
  }
}
```

### `src/orders/orders.controller.ts`
```ts
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('stores/:storeId/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  listOrders(@Param('storeId') storeId: string) {
    return this.ordersService.listOrders(storeId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Param('storeId') storeId: string, @Body() dto: Record<string, any>) {
    return this.ordersService.createOrder(storeId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':orderId/status')
  updateStatus(@Param('orderId') orderId: string, @Body() dto: Record<string, any>) {
    return { id: orderId, status: dto.status };
  }
}
```

---

## 9) Payments module

### `src/payments/payments.service.ts`
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  createMidtransTransaction(orderId: string, amount: number) {
    return {
      token: 'midtrans-demo-token',
      redirect_url: `https://app.midtrans.com/snap/v1/transactions/${orderId}`,
      amount,
      order_id: orderId,
    };
  }

  handleWebhook(payload: any) {
    return {
      status: 'success',
      orderId: payload.order_id,
    };
  }
}
```

### `src/payments/payments.controller.ts`
```ts
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('midtrans/create')
  createTransaction(@Body() body: any) {
    return this.paymentsService.createMidtransTransaction(body.order_id, body.amount);
  }

  @Post('midtrans/webhook')
  webhook(@Body() payload: any) {
    return this.paymentsService.handleWebhook(payload);
  }
}
```

---

## 10) Public storefront module

### `src/public/public.controller.ts`
```ts
import { Controller, Get, Param } from '@nestjs/common';
import { PublicService } from './public.service';

@Controller('public')
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get(':slug')
  getPublicStore(@Param('slug') slug: string) {
    return this.publicService.getStoreBySlug(slug);
  }
}
```

### `src/public/public.service.ts`
```ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PublicService {
  private stores = [
    {
      id: 'demo-store-id',
      name: 'Demo Store',
      slug: 'demo-store',
      description: 'Sample storefront',
      logo_url: 'https://example.com/logo.png',
      products: [
        {
          id: 'prod-1',
          name: 'Kaos Premium',
          price: 149000,
          stock: 12,
          slug: 'kaos-premium',
        },
      ],
    },
  ];

  getStoreBySlug(slug: string) {
    const store = this.stores.find((s) => s.slug === slug);
    if (!store) throw new NotFoundException('Store not found');
    return store;
  }
}
```

---

## 11) Complete modules index

Create these files:
- `src/auth/auth.module.ts`
- `src/auth/auth.service.ts`
- `src/auth/auth.controller.ts`
- `src/auth/jwt.strategy.ts`
- `src/stores/stores.module.ts`
- `src/stores/stores.service.ts`
- `src/stores/stores.controller.ts`
- `src/products/products.module.ts`
- `src/products/products.service.ts`
- `src/products/products.controller.ts`
- `src/orders/orders.module.ts`
- `src/orders/orders.service.ts`
- `src/orders/orders.controller.ts`
- `src/payments/payments.module.ts`
- `src/payments/payments.service.ts`
- `src/payments/payments.controller.ts`
- `src/public/public.module.ts`
- `src/public/public.service.ts`
- `src/public/public.controller.ts`
- `src/common/decorators/user.decorator.ts`
- `src/common/guards/jwt-auth.guard.ts`
- `src/common/types/user-request.type.ts`

---

## 12) Tips for next step
Once this starter is in place, the next practical step is:
- connect to Postgres with TypeORM or Prisma
- implement real `users` and `stores` persistence
- add `store_id` validation middleware
- add `Midtrans signature verification`
- create `web` storefront page with dynamic route from store slug
- create `Flutter` app skeleton using same API contract

This bootstrap is intentionally simple so it can evolve quickly. For production-grade code, the next layer should be a real database + service layer + DTO validation.

---

## 13) Recommended next code action
I recommend the next implementation step is to generate the real NestJS project structure and implement the first four modules in code:
- `auth`
- `stores`
- `products`
- `orders`

After that, we can add `payments` and `public storefront`.

If you want, I can continue by producing the actual files for a working NestJS project structure in the repo and/or generate a starter Flutter project skeleton next.
