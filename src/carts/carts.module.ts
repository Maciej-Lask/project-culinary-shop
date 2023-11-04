import { Module } from '@nestjs/common';
import { CartController } from './carts.controller';
import { CartService } from './carts.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CartController],
  providers: [CartService],
  imports: [PrismaModule],
})
export class CartsModule {}
