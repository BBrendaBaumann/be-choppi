import { CartItem, CartQuoteResponse } from './interfaces/cart.interface';
import { CartService } from './cart.service';
export declare class CartController {
    private readonly svc;
    constructor(svc: CartService);
    quote(items: CartItem[]): Promise<CartQuoteResponse>;
}
