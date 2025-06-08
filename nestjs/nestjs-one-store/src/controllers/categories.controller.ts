import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {

  @Get('categories')
  getCategories(@Query('limit') limit = 10, @Query('offset') offset = 30): string {
    return "categories con limit: " + limit + " y offset: " + offset;
  }
  @Get('/:categoryId/products/:productId')
  getCategoryProduct(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string
  ): string {
    return `Category ID: ${categoryId}, Product ID: ${productId}`;
  }
}
