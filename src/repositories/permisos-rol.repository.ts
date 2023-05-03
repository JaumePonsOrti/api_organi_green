import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Permisos, PermisosRolRelations, Permisos_Rol} from '../models';

export class PermisosRolRepository extends DefaultCrudRepository<
  Permisos_Rol,
  typeof Permisos_Rol.prototype.permisos_rol_id,
  PermisosRolRelations
> {
  public readonly permisos: BelongsToAccessor<
    Permisos,
    typeof Permisos_Rol.prototype.permisos_rol_rol_id
  >;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,

  ) {
    super(Permisos_Rol, dataSource);
  }
}
