import { ReqImageDto } from './upload-image.dto';
import { UploadRepository } from './upload.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../base.service';

@Injectable()
export class UploadService extends BaseService<any> {
  constructor(@InjectRepository(UploadRepository) public repo: UploadRepository) {
    super(repo)
  }

  async saveImage(dto: ReqImageDto) {
    return this.repo.save(dto);
  }

  async saveImages(dto: ReqImageDto[]) {
    dto?.forEach(dto => {
      this.create(dto);
    });
    return dto;
  }
}
