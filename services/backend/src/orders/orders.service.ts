import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class OrdersService {
  private readonly orders = [
    {
      id: 'ord-1',
      store_id: 'demo-store-id',
      customer_name: 'Budi Santoso',
      total_amount: 149000,
      status: 'paid',
    },
  ];

  listOrders(storeId: string) {
    return this.orders.filter((order) => order.store_id === storeId);
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
