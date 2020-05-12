import { Repository, EntityRepository } from 'typeorm';
import _ = require("lodash");
import { Image } from './image.entity';

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {

}