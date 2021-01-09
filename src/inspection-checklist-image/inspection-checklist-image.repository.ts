import { sqlOp } from '../models/generic.model';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { InspectionChecklistImage } from './inspection-checklist-image.entity';
import { IInspectionChecklistImageDto } from './inspection-checklist-image.dto';

@EntityRepository(InspectionChecklistImage)
export class InspectionChecklistImageRepository extends Repository<InspectionChecklistImage> {

  async deleteById(id: string): Promise<IInspectionChecklistImageDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      await this.delete(id);
    }
    return exist
  }

  async saveInsImage(dto: IInspectionChecklistImageDto[]): Promise<IInspectionChecklistImageDto[]> {

    /* delete the image first before inserting new one */
    dto.forEach(async (image: IInspectionChecklistImageDto) => {
      const criteria = {
        inspection_checklist_run: image.inspection_checklist_run,
        contract_term: image.contract_term
      };
      await this.delete(criteria)
    });

    return await this.save(dto);
  }
}

