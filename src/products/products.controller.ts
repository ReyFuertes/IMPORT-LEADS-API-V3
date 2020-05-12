import { Product } from './products.entity';
import { GetProductsDto, ReqProdDto, ResProdDto } from './products.dto';
import { ProductsService } from './products.service';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private contractsService: ProductsService) { }

  @Patch()
  update(@Body() dto: ReqProdDto): Promise<ResProdDto> {
    return this.contractsService.updateProduct(dto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string): Promise<ResProdDto> {
    return this.contractsService.deleteById(id);
  }

  @Get()
  getAll(@Query() dto: GetProductsDto ): Promise<ResProdDto[]> {
    return this.contractsService.getAllProducts(dto);
  }

  @Post()
  create(@Body() dto: ReqProdDto): Promise<ResProdDto> {
    return this.contractsService.createProduct(dto);
  }
}
