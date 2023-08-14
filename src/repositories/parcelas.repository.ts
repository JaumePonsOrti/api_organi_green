import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Parcelas, ParcelasRelations} from '../models';

export class ParcelasRepository extends DefaultCrudRepository<
  Parcelas,
  typeof Parcelas.prototype.parcelas_id,
  ParcelasRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Parcelas, dataSource);
  }
}
