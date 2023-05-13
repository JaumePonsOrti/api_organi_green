import {Enlace_Menu} from './enlace_menu';

export class Elementos_menu {
  constructor() {

  }

  private static lista_elementos: Enlace_Menu[] = [
    new Enlace_Menu(
      "Planificación",
      "planificar",
      "planificacion"
    ),
    new Enlace_Menu(
      "Ver Planificación",
      "planificar",
      "desplegable"
    ),
    new Enlace_Menu(
      "Ver Planificación En Campo",
      "planificar",
      "desplegable"
    ),
    new Enlace_Menu(
      "Resumen planificacion",
      "producto",
      "desplegable"
    ),
    new Enlace_Menu(
      "Clientes",
      "cliente",
      "crud"
    ), new Enlace_Menu(
      "Usuarios",
      "usuario",
      "crud"
    ),
    new Enlace_Menu(
      "Productos",
      "producto",
      "crud"
    ),
    new Enlace_Menu(
      "Campos",
      "campo",
      "crud"
    ),
    new Enlace_Menu(
      "Parcelas",
      "parcela",
      "crud"
    ),
    new Enlace_Menu(
      "Versiones App",
      "app",
      "crud"
    ),
    new Enlace_Menu(
      "Rol APP",
      "permisos_de_rol_app",
      "crud"
    ),
    new Enlace_Menu(
      "Roles",
      "rol",
      "crud"
    ),
    new Enlace_Menu(
      "Permisos Rol",
      "permisos_rol",
      "crud"
    ),
    new Enlace_Menu(
      "Permisos",
      "permisos",
      "crud"
    ),
    new Enlace_Menu(
      "Gestionar Permisos por ROL",
      "parcela",
      "CHECKEABLE"
    ), new Enlace_Menu(
      "Gestionar Permisos por rol APP ",
      "parcela",
      "CHECKEABLE"
    ),
  ];

  /**
  * ____________  Lista elementos ________________
  * 0: Planificación
  * 1: Ver Planificación
  * 2: Ver Planificación EN CAMPO
  * 3:Resumen planificacion
  * 4: Clientes
  * 5: Usuarios
  * 6: Productos
  * 7: Campos
  * 8: Parcelas
  * 9: Versiones APP
  * 10: Rol APP
  * 11: Roles
  * 12: Permisos
  * 13: Permisos Rol
  * 14: Gestionar Permisos por ROL
  * 15: Gestionar Permisos por ROL APP
  */
  public static getLista() {
    return this.lista_elementos;
  }
}
