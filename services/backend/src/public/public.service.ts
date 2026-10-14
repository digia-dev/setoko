import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PublicService {
  private readonly stores = [
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
    const store = this.stores.find((item) => item.slug === slug);
    if (!store) {
      throw new NotFoundException('Store not found');
    }
    return store;
  }
}
