import { CreateImageDto } from './dto/create-image.dto';
import { UploadRepository } from './upload.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base.service';

@Injectable()
export class UploadService extends BaseService<any> {
  constructor(@InjectRepository(UploadRepository) public contractsRepository: UploadRepository) {
    super(contractsRepository)
  }
  async saveImages(imagesDto: CreateImageDto[]) {
    imagesDto && imagesDto.forEach(dto => {
      this.create(dto);
    });
    return imagesDto;
  }
}
