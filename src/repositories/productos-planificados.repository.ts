import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Productos_Planificados, ProductosPlanificadosRelations} from '../models';

export class ProductosPlanificadosRepository extends DefaultCrudRepository<
  Productos_Planificados,
  typeof Productos_Planificados.prototype.productos_planificados_id,
  ProductosPlanificadosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Productos_Planificados, dataSource);
  }
}
