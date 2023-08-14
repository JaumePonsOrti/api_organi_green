import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Permisos_De_Rol_App, Permisos_De_Rol_App_Relations} from '../models';

export class PermisosDeRolAppRepository extends DefaultCrudRepository<
  Permisos_De_Rol_App,
  typeof Permisos_De_Rol_App.prototype.permisos_de_rol_app_id,
  Permisos_De_Rol_App_Relations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Permisos_De_Rol_App, dataSource);
  }

  public async findByApp(app: number) {
    return await this.find({
      where: {permisos_de_rol_app_app_id: app}
    });
  }
}
