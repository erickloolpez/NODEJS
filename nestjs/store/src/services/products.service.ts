import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/dtos/products.dtos';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [{
    id: 1,
    name: "Product 1 ",
    price: 100,
    description: "Description of product 1",
    stock: 10,
    image: "localhost"
  }]

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(item => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(payload: any) {
    const newProduct = {
      id: this.counterId++,
      ...payload
    }
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: CreateProductDto) {
    const product = this.findOne(id)

    if (product) {
      const index = this.products.findIndex(item => item.id === id)
      this.products[index] = {
        ...product,
        ...payload
      }
      return this.products[index]
    }
    return null
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products.splice(index, 1);
    return true;
  }
}
