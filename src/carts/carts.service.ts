import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cart, Product } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prismaService: PrismaService) {}

  public getCartByUserId(userId: string): Promise<Cart | null> {
    return this.prismaService.cart.findFirst({
      where: { userId },
      include: {
        products: true,
      },
    });
  }

  public async addToCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.getCartByUserId(userId);

    if (cart) {
      // If the cart for the user already exists, update it to add the product.
      return this.prismaService.cart.update({
        where: { id: cart.id },
        data: {
          products: {
            connect: { id: productId },
          },
        },
        include: {
          products: true,
        },
      });
    } else {
      // If the cart doesn't exist, create a new cart and add the product to it.
      return this.prismaService.cart.create({
        data: {
          userId,
          products: {
            connect: { id: productId },
          },
        },
        include: {
          products: true,
        },
      });
    }
  }

  public async removeFromCart(
    userId: string,
    productId: string,
  ): Promise<Cart> {
    const cart = await this.getCartByUserId(userId);

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    return this.prismaService.cart.update({
      where: { id: cart.id },
      data: {
        products: {
          disconnect: { id: productId },
        },
      },
      include: {
        products: true,
      },
    });
  }
}
