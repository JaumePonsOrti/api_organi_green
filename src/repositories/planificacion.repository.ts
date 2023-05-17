import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Planificacion, PlanificacionRelations} from '../models';

export class PlanificacionRepository extends DefaultCrudRepository<
  Planificacion,
  typeof Planificacion.prototype.planificacion_id,
  PlanificacionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Planificacion, dataSource);
  }
}
