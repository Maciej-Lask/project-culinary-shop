import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseUUIDPipe,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { CartService } from './carts.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get('/:userId')
  async getCartByUserId(@Param('userId', new ParseUUIDPipe()) userId: string) {
    const cart = await this.cartService.getCartByUserId(userId);
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  @Post('/:userId/add/:productId')
  async addToCart(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ) {
    return this.cartService.addToCart(userId, productId);
  }

  @Delete('/:userId/remove/:productId')
  async removeFromCart(
    @Param('userId', new ParseUUIDPipe()) userId: string,
    @Param('productId', new ParseUUIDPipe()) productId: string,
  ) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
