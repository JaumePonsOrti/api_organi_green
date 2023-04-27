import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {PermisosDeRolApp, PermisosDeRolAppRelations} from '../models';

export class PermisosDeRolAppRepository extends DefaultCrudRepository<
  PermisosDeRolApp,
  typeof PermisosDeRolApp.prototype.permisos_de_rol_app_id,
  PermisosDeRolAppRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(PermisosDeRolApp, dataSource);
  }
}
