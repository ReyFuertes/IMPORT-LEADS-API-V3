import { ContractCategory } from 'src/contract-category/contract-category.entity';
import { ContractTerm } from 'src/contract-term/contract-term.entity';
import { ContractsRepository } from 'src/contracts/contracts.repository';
import { Repository, EntityRepository, getCustomRepository, getRepository } from 'typeorm';
import { ContractTemplate } from './contract-template.entity';

@EntityRepository(ContractTemplate)
export class ContractTemplateRepository extends Repository<any> {

  async import(dto: any): Promise<any> {

    /**** CONTRACT ****/
    const contract_repo = getCustomRepository(ContractsRepository);
    await contract_repo.save({
      ...dto.contract,
      id: dto.current_contract.id,
      contract_name: dto.current_contract.contract_name
    });

    /**** CONTRACT CATEGORY ****/
    const contract_category_repo = getRepository(ContractCategory);
    const contract_category_query = await contract_category_repo
      .createQueryBuilder('contract_category');

    /******* we need  to delete the previous contract categories *******/
    // await contract_category_query
    //   .leftJoinAndSelect('contract_category.contract', 'contract')
    //   .where('contract_id = :id', { id: dto?.current_contract?.id })
    //   .getMany();

    await contract_category_repo.createQueryBuilder()
      .delete()
      .from(ContractCategory)
      .where("contract_id =:id", { id: dto?.current_contract?.id })
      .execute();
    /****************************************************************/

    // destination
    const contract_category_results = await contract_category_query
      .leftJoinAndSelect('contract_category.contract', 'contract')
      .where('contract_id = :id', { id: dto?.contract?.id })
      .getMany();

    /******* CONTRACT TERMS *******/
    const contract_category_term_repo = getRepository(ContractTerm);
    const contract_category_term_query = await contract_category_term_repo.
      createQueryBuilder('contract_term');

    const current_contract_category_term_results = await contract_category_term_query
      .leftJoinAndSelect('contract_term.contract_category', 'contract_category')
      .leftJoinAndSelect('contract_term.contract_tag', 'tag')
      .getMany();

    /* perform insert  */
    let contract_category_save_results: any;
    let contract_terms_save_results: any;
    
    contract_category_results.forEach(async (contract_category) => {
      const terms = current_contract_category_term_results
        .filter(t => t.contract_category.id === contract_category.id);

      contract_category_save_results = await contract_category_repo
        .save({
          category_id: contract_category.category_id,
          contract: { id: dto.current_contract.id },
          position: contract_category.position
        });

      contract_terms_save_results = terms.forEach(async (t) => {
        await contract_category_term_repo.save({
          term_name: t.term_name,
          term_description: t.term_description,
          contract_category: { id: contract_category_save_results.id },
          tag: { id: t?.contract_tag?.id }
        });
      });
      
    });

    await Promise.all([contract_category_save_results, contract_terms_save_results]);

    return true;
  }

  async getSavedContracts(dto: any): Promise<any> {
    const query = this.createQueryBuilder('contract_template');

    const results = await query
      .leftJoinAndSelect('contract_template.contract', 'contract.contract_template')
      .getMany();

    return results;
  }

  async saveContractTemplate(dto: any): Promise<ContractTemplate> {
    const ret = await this.save(dto);
    return ret;
  }
}

    // //
    //
    //
    //

    // /*
    //   
    //   
    //   
    //   
    //   

    // /* create the contract category terms */
    // const contract_terms = contract_category_term_results.map(t => {
    //   return {
    //     term_name: t.term_name,
    //     term_description: t.term_description,
    //     contract_category: { id: t.contract_category.id },
    //     tag: { id: t?.contract_tag?.id }
    //   }
    // });
    // //console.log(contract_terms)

    // //await contract_category_term_repo.save(contract_terms);
