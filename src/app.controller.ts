import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getWelcome(): object {
    return {
      message: '¡Bienvenido a Choppi API!',
      endpoints: {
        auth: '/auth',
        stores: '/stores',
        products: '/products',
        cart: '/cart'
      }
    };
  }
  }

