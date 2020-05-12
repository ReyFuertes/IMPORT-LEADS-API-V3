import { ImagesRepository } from './images.repository';
import { ReorderContractImageDto } from './dto/reorder-contract-image-dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';
import { Image } from './image.entity';

@Injectable()
export class ImageService extends BaseService<Image> {
  constructor(@InjectRepository(ImagesRepository) public imagesRepository: ImagesRepository) {
    super(imagesRepository);
  }
  async reOrder(images: Image[]) {
    images && images.forEach(image => {
      this.imagesRepository.update(image.id, image);
    });
    
  }
}
