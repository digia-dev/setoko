import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class StoresService {
  private readonly stores = [
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
