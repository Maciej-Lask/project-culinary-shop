import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/')
  public getAllProducts() {
    return this.productService.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productService.getProductById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  @Get('/search/:searchPhrase')
  async searchProducts(@Param('searchPhrase') searchPhrase: string) {
    return this.productService.searchProducts(searchPhrase);
  }

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productService.createProduct(productData);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productService.getProductById(id)))
      throw new NotFoundException('Product not found');
    return this.productService.updateProduct(id, productData);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productService.getProductById(id)))
      throw new NotFoundException('Product not found');
    await this.productService.deleteProduct(id);
    return { success: true };
  }
}
