import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ProductosPlanificados, ProductosPlanificadosRelations} from '../models';

export class ProductosPlanificadosRepository extends DefaultCrudRepository<
  ProductosPlanificados,
  typeof ProductosPlanificados.prototype.product_plan_id,
  ProductosPlanificadosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ProductosPlanificados, dataSource);
  }
}
