import { Controller, Get, Param, Post, Body, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe';
import { CreateProductDto } from 'src/dtos/products.dtos';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {

  }

  @Get()
  getProducts() {
    return this.productService.findAll()
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id)
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: any) {
    return this.productService.update(+id, payload)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.remove(+id)
  }
}
