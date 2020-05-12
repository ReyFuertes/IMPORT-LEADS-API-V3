import { ReorderContractImageDto } from './dto/reorder-contract-image-dto';
import { ImageService } from './images.service';
import { join } from 'path';
import { Controller, Get, Post, Body, Param, ParseIntPipe, Delete, Patch, Query, Res } from '@nestjs/common';
import { Image } from './image.entity';

@Controller('images')
export class ImagesController {
  constructor(private imageService: ImageService) { }

  @Patch('reorder')
  reOrder(@Body() images: Image[]): void {
    this.imageService.reOrder(images);
  }
}
