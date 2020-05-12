import { Product } from './products.entity';
import { GCDto } from './../contracts/contracts.dto';
import { ReqProdDto, ResProdDto } from './products.dto';
import { ProductsRepository } from './products.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class ProductsService extends BaseService<Product> {
  constructor(@InjectRepository(ProductsRepository) public repo: ProductsRepository) {
    super(repo);
  }

  async updateProduct(dto: ReqProdDto): Promise<ResProdDto> {
    return this.repo.updateProduct(dto);
  }

  async deleteById(id: string): Promise<ResProdDto> {
    return this.repo.deleteProduct(id);
  }

  async createProduct(dto: ReqProdDto): Promise<ResProdDto> {
    return this.repo.createProduct(dto);
  }

  async getAllProducts(dto: GCDto): Promise<ResProdDto[]> {
    return this.repo.getProducts(dto)
  }
}
