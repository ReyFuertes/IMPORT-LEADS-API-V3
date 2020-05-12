import { ContractTermDto } from './contract-term.dto';
import { ContractTerm } from './contract-term.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(ContractTerm)
export class ContractTermRepository extends Repository<ContractTerm> {

  async deleteTerm(id: string): Promise<ContractTermDto> {
    const exist = await this.findOne({ id });
    if (exist) {
      this.createQueryBuilder()
        .delete()
        .from(ContractTerm)
        .where("id = :id", { id })
        .execute();

      return exist;
    }
    return null;
  }

  async saveTerm(dto: ContractTermDto): Promise<ContractTermDto> {
    return this.save(dto);
  }
}