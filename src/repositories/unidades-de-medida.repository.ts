import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Unidades_De_Medida, Unidades_De_MedidaRelations} from '../models';

export class Unidades_De_MedidaRepository extends DefaultCrudRepository<
  Unidades_De_Medida,
  typeof Unidades_De_Medida.prototype.medida_id,
  Unidades_De_MedidaRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Unidades_De_Medida, dataSource);
  }
}
