import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Asignacion, AsignacionRelations} from '../models';

export class AsignacionRepository extends DefaultCrudRepository<
  Asignacion,
  typeof Asignacion.prototype.asignacion_id,
  AsignacionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Asignacion, dataSource);
  }
}
