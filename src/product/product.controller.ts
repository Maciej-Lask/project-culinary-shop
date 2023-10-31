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
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

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

  @Post('/')
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productService.createProduct(productData);
  }

  @Put('/:id')
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productService.getProductById(id)))
      throw new NotFoundException('Product not found');
    return this.productService.updateProduct(id, productData);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productService.getProductById(id)))
      throw new NotFoundException('Product not found');
    await this.productService.deleteProduct(id);
    return { success: true };
  }
}
