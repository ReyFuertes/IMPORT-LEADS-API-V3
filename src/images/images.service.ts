import { ImagesRepository } from './images.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Image } from './image.entity';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(@InjectRepository(ImagesRepository) public repo: ImagesRepository) {
    super(repo);
  }

  async createImage(dto: Image): Promise<Image> {
    return this.repo.saveImage(dto);
  }

  async reOrder(images: Image[]) {
    images && images.forEach(image => {
      this.repo.update(image.id, image);
    });
  }
}
