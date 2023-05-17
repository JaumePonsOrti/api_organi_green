import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {UnidadesDeMedida, UnidadesDeMedidaRelations} from '../models';

export class UnidadesDeMedidaRepository extends DefaultCrudRepository<
  UnidadesDeMedida,
  typeof UnidadesDeMedida.prototype.medida_id,
  UnidadesDeMedidaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(UnidadesDeMedida, dataSource);
  }
}
