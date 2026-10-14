import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
