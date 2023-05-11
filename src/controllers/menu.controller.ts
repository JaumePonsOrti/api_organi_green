import {inject} from '@loopback/core';
import {get, param} from '@loopback/rest';
import {BearerAuthenticationStrategy} from '../bearer-strategy';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';

export class MenuController {
  constructor(
    @inject('models.MenuPorRol') private menuPorRol: Menus_por_rol,
    @inject('repositories.UsuarioRepository') private usuarioRepository: UsuarioRepository
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
    @inject(BearerAuthenticationStrategy.CURRENT_USER) currentUserProfile: Usuario,
  ): Promise<any> {
    const usuario: Usuario = await this.usuarioRepository.findById(currentUserProfile.usuario_id);
    const menus = this.menuPorRol.elementoPorRol_id[usuario.usuario_rol_id ?? 7];
    return {
      menus: menus,
    };
  }

}

