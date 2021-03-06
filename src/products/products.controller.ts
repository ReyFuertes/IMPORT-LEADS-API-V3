import { Product } from './products.entity';
import { GetProductsDto, ReqProdDto, ResProdDto } from './products.dto';
import { ProductsService } from './products.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private srv: ProductsService) { }

  @Patch()
  ////@UseGuards(AuthGuard('jwt'))
  update(@Body() dto: ReqProdDto): Promise<ResProdDto> {
    return this.srv.updateProduct(dto);
  }

  @Delete('/:id')
  ////@UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: string): Promise<ResProdDto> {
    return this.srv.deleteById(id);
  }

  @Get()
  getAll(@Query() dto: GetProductsDto ): Promise<ResProdDto[]> {
    return this.srv.getAllProducts(dto);
  }

  @Post()
  ////@UseGuards(AuthGuard('jwt'))
  create(@Body() dto: ReqProdDto): Promise<ResProdDto> {
    return this.srv.createProduct(dto);
  }
}
