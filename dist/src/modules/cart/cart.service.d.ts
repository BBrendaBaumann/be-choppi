import { Repository } from 'typeorm';
import { StoreProduct } from '@/entities/store-product.entity';
import { CartItem, CartQuoteResponse } from './interfaces/cart.interface';
export declare class CartService {
    private readonly repo;
    constructor(repo: Repository<StoreProduct>);
    quote(items: CartItem[]): Promise<CartQuoteResponse>;
}
