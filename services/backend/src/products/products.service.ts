import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  private readonly products = [
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
    return this.products.filter((product) => product.store_id === storeId);
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
