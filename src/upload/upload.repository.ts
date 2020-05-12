import { EntityRepository, Repository } from "typeorm";
import { Image } from "src/images/image.entity";

@EntityRepository(Image)
export class UploadRepository extends Repository<Image> {

}