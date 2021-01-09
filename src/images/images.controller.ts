import { ImageService } from './images.service';
import { join } from 'path';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {
  constructor(private srv: ImageService) { }

  @Post()
  create(@Body() dto: Image): Promise<Image> {
    return this.srv.createImage(dto);
  }

  @Patch('reorder')
  reOrder(@Body() images: Image[]): void {
    this.srv.reOrder(images);
  }
}
