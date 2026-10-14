import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
