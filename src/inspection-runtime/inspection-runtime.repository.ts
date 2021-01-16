import { sqlOp } from '../models/generic.model';
import { Repository, EntityRepository, getCustomRepository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { InspectionRuntime } from './inspection-runtime.entity';
import { IInspectionStatusPayload } from './inspection-runtime.dto';
import { InspectionChecklistRunRepository } from '../inspection-checklist-run/inspection-checklist-run.repository';
import { RunStatusType } from '../inspection-checklist-run/inspection-checklist-run.dto';
import * as moment from 'moment';

@EntityRepository(InspectionRuntime)
export class InspectionRuntimeRepository extends Repository<InspectionRuntime> {

  async changeStatus(dto: IInspectionStatusPayload): Promise<any> {
    const run_repo = getCustomRepository(InspectionChecklistRunRepository);
    const query = await run_repo.createQueryBuilder('inspection_checklist_run');
    const match = await query
      .leftJoinAndSelect('inspection_checklist_run.inspection', 'inspection.saved_checklist_item')
      .where("inspection_checklist_run.id = :id", { id: dto.id })
      .getOne()

    if (match) {
      /* update checklist run status */
      const run_payload = {
        id: match.id,
        run_status: dto.run_status ? dto.run_status : null
      }
      await run_repo.save(run_payload);

      /* stop all */
      if(dto.run_status == 0) {
        this.stopAll(dto.saved_checklist.id);
      }

      /* update runtime date if stopped */
      const runtime_match = await this.findOne({ inspection: { id: match.inspection.id } });

      let runtimePayload: any;
      if (dto.run_status == RunStatusType.stop) {
        runtimePayload = {
          ...runtime_match,
          run_end: moment(new Date()).format()
        }

        await this.save(runtimePayload);
      }

      return Object.assign(run_payload);
    } else {
      throw new BadRequestException('No checklist to pause/resume/stop');
    }
  }

  async stopAll(id: string): Promise<void> {
    const run_repo = getCustomRepository(InspectionChecklistRunRepository);
    const query = await run_repo.createQueryBuilder('inspection_checklist_run');
    const matches = await query.where("saved_checklist_id = :id", { id }).getMany();

    matches.forEach(async (match) => {
      match.run_status = String(0);
      await run_repo.save(match);
    });
  }
}

