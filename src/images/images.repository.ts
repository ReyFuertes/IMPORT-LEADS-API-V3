import { Repository, EntityRepository } from 'typeorm';
import * as _ from 'lodash';
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {
  async saveImage(dto: Image): Promise<Image> {
    return this.save(dto);
  }
}