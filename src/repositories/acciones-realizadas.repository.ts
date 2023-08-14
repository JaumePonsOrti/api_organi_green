import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AccionesRealizadas, AccionesRealizadasRelations} from '../models';

export class AccionesRealizadasRepository extends DefaultCrudRepository<
  AccionesRealizadas,
  typeof AccionesRealizadas.prototype.acciones_id,
  AccionesRealizadasRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(AccionesRealizadas, dataSource);
  }
}
