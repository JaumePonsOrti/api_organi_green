import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Permisos, PermisosRelations} from '../models';

export class PermisosRepository extends DefaultCrudRepository<
  Permisos,
  typeof Permisos.prototype.permisos_id,
  PermisosRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Permisos, dataSource);
  }
}
