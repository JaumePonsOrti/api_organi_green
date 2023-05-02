import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Permisos, PermisosRolRelations, Permisos_Rol} from '../models';
import {PermisosRepository} from './permisos.repository';

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
    @repository.getter('PermisosRepository') protected permisosRepositoryGetter: Getter<PermisosRepository>
  ) {
    super(Permisos_Rol, dataSource);
    this.permisos = this.createBelongsToAccessorFor(
      'permisos',
      permisosRepositoryGetter,
    );
  }
}
