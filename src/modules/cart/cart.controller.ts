import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CartItem, CartQuoteResponse } from './interfaces/cart.interface';
import { CartService } from './cart.service';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly svc: CartService) {}

  @Post('quote')
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          storeProductId: { type: 'integer', example: 1 },
          quantity: { type: 'integer', example: 2 },
        },
      },
    },
  })
  async quote(@Body() items: CartItem[]): Promise<CartQuoteResponse> {
    return this.svc.quote(items);
  }
}
