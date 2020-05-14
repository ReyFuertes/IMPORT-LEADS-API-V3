import { Product } from './products.entity';
import { GetProductsDto, ReqProdDto, ResProdDto } from './products.dto';
import { ProductsService } from './products.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private srv: ProductsService) { }

  @Patch()
  update(@Body() dto: ReqProdDto): Promise<ResProdDto> {
    return this.srv.updateProduct(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<ResProdDto> {
    return this.srv.deleteById(id);
  }

  @Get()
  getAll(@Query() dto: GetProductsDto ): Promise<ResProdDto[]> {
    return this.srv.getAllProducts(dto);
  }

  @Post()
  create(@Body() dto: ReqProdDto): Promise<ResProdDto> {
    return this.srv.createProduct(dto);
  }
}
