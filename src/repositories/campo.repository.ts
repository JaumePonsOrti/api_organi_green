import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Campo, CampoRelations} from '../models';

export class CampoRepository extends DefaultCrudRepository<
  Campo,
  typeof Campo.prototype.campo_id,
  CampoRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Campo, dataSource);
  }
}
