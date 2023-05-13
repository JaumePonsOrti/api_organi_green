import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {APPAuthenticationStrategy} from '../app-strategy';
import {BearerAuthenticationStrategy} from '../bearer-strategy';
import {App, Menus_por_rol, Permisos_De_Rol_App, Usuario} from '../models';
import {PermisosDeRolAppRepository} from '../repositories';

export class MenuController {
  constructor(
    @inject('models.models.Menu_y_sus_partes.Menu_Por_Rol') private menuPorRol: Menus_por_rol,
    @inject('repositories.PermisosDeRolAppRepository') private permisos_de_rol: PermisosDeRolAppRepository,

  ) { }

  @get('/menu/get/{roleId}')
  async get_menu_rol_porpametro(
    @param.path.string('roleId') roleId: number,
  ): Promise<any> {
    const menus = this.menuPorRol.elementoPorRol_id[roleId];
    return {
      menus: menus,
    };

  }

  @get('/menu/get')
  async get_menu(

  ): Promise<any> {
    const usuario: Usuario = BearerAuthenticationStrategy.CURRENT_USER;
    const app: App = APPAuthenticationStrategy.CURRENT_APP;
    const rol_app: Permisos_De_Rol_App[] = await this.permisos_de_rol.findByApp(app.app_id ?? 0);

    let menus = this.menuPorRol.elementoPorRol_id[6];
    for (let index = 0; index < rol_app.length; index++) {
      const element = rol_app[index];
      if (usuario.usuario_rol_id < element.permisos_de_rol_app_rol_id) {
        menus = this.menuPorRol.elementoPorRol_id[element.permisos_de_rol_app_rol_id]
      }
      else if (usuario.usuario_rol_id > element.permisos_de_rol_app_rol_id) {
        menus = this.menuPorRol.elementoPorRol_id[usuario.usuario_rol_id]
      }
      else if (element.permisos_de_rol_app_rol_id == usuario.usuario_rol_id) {
        menus = this.menuPorRol.elementoPorRol_id[usuario.usuario_rol_id];
      }
    }
    return {
      menus: menus,
    };
  }

}

