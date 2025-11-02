import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreProduct } from '@/entities/store-product.entity';
import { CartItem, CartQuoteResponse } from './interfaces/cart.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(StoreProduct)
    private readonly repo: Repository<StoreProduct>,
  ) {}

  async quote(items: CartItem[]): Promise<CartQuoteResponse> {
    const details: CartQuoteResponse['details'] = [];
    let subtotal = 0;

    for (const it of items) {
      const sp = await this.repo.findOne({ where: { id: it.storeProductId } });
      if (!sp) {
        details.push({ storeProductId: it.storeProductId, error: 'not_found' });
        continue;
      }

      const unitPrice = Number(sp.price);
      const line = unitPrice * it.quantity;
      subtotal += line;

      details.push({
        storeProductId: it.storeProductId,
        unitPrice,
        quantity: it.quantity,
        line,
      });
    }

    return { subtotal, details };
  }
}
