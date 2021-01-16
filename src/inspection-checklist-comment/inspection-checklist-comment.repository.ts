import { sqlOp } from '../models/generic.model';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { InspectionChecklistComment } from './inspection-checklist-comment.entity';
import { IInspectionChecklistCommentDto } from './inspection-checklist-comment.dto';
import { SavedChecklistRepository } from '../saved-checklist/saved-checklist.repository';
import { ISavedChecklistDto } from '../saved-checklist/saved-checklist.dto';
import { InspectionChecklistImageRepository } from '../inspection-checklist-image/inspection-checklist-image.repository';
import { IInspectionChecklistImageDto } from '../inspection-checklist-image/inspection-checklist-image.dto';

@EntityRepository(InspectionChecklistComment)
export class InspectionChecklistCommentRepository extends Repository<InspectionChecklistComment> {

  async updateChecklist(dto: IInspectionChecklistCommentDto): Promise<IInspectionChecklistCommentDto> {
    return await this.save(dto);
  }

  async deleteById(id: string): Promise<void> {
    await this.delete(id)
  }

  async getChecklists(id: string): Promise<IInspectionChecklistCommentDto[]> {
    const query = this.createQueryBuilder('inspection_checklist_comment');
    const checklists = await query
      .leftJoinAndSelect("inspection_checklist_comment.inspection_checklist_run", "inspection_checklist_run.inspection_checklist_comment")
      .leftJoinAndSelect("inspection_checklist_comment.contract_term", "contract_term.inspection_checklist_comment")
      .where("inspection_checklist_comment.id = :id", { id })
      .orderBy("inspection_checklist_comment.created_at", "DESC")
      .getMany();

    const ret = await Promise.all(checklists.map(async (c) => {

      const images = await this.getChecklistImagesByRunId(c.inspection_checklist_run.id, c.contract_term.id)

      const checklist = Object.assign({}, c, {
        images
      })
      return { ...checklist }
    })
    )

    return ret;
  }

  async getChecklistImagesByRunId(inspection_checklist_run_id: string, contract_term_id: string): Promise<IInspectionChecklistImageDto[]> {
    const repo = getCustomRepository(InspectionChecklistImageRepository);
    const query = repo.createQueryBuilder('inspection_checklist_image');
    const results: IInspectionChecklistImageDto[] = await query
      .where("inspection_checklist_image.inspection_checklist_run_id = :inspection_checklist_run_id", { inspection_checklist_run_id })
      .andWhere("inspection_checklist_image.contract_term_id = :contract_term_id", { contract_term_id })
      .getMany();

    return results;
  }

  async getSavedChecklistById(id: string): Promise<ISavedChecklistDto> {
    const repo = getCustomRepository(SavedChecklistRepository);
    const query = repo.createQueryBuilder('saved_checklist_item');
    const results: ISavedChecklistDto[] = await query
      .where("id = :id", { id })
      .getMany();

    return results.shift();
  }

  async saveChecklist(dto: IInspectionChecklistCommentDto): Promise<IInspectionChecklistCommentDto> {
    const criteria = {
      saved_checklist: { id: dto.saved_checklist.id },
      contract_category: { id: dto.contract_category.id },
      contract_term: { id: dto.contract_term.id }
    }
    const exist = await this.findOne(criteria);
    if (exist) {
      await this.delete(criteria);
    }

    return await this.save(dto);
  }
}

