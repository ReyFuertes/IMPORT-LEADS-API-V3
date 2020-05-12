import { ImagesRepository } from './images.repository';
import { ImagesController } from './images.controller';
import { ImageService } from './images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([ImagesRepository])],
  controllers: [ImagesController],
  providers: [ImageService]
})
export class ImagesModule {}
