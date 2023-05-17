import {Enlace_Menu} from './enlace_menu';

export class Elementos_menu {
  constructor() {

  }

  private static lista_elementos: Enlace_Menu[] = [
    new Enlace_Menu(
      "Planificación",
      "planificar",
      "planificacion",
      "fa fa-calendar"
    ),
    new Enlace_Menu(
      "Ver Planificación",
      "planificar",
      "desplegable",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Ver Planificación En Campo",
      "planificar",
      "desplegable",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Resumen planificacion",
      "desplegable",
      "producto",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Clientes",
      "crud",
      "cliente",
      "fas fa-tachometer-alt"
    ), new Enlace_Menu(
      "Usuarios",
      "crud",
      "usuario",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Productos",
      "crud",
      "producto",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Campos",
      "crud",
      "campo",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Parcelas",
      "crud",
      "parcela",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Versiones App",
      "app",
      "crud",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Rol APP",
      "crud",
      "permisos_de_rol_app",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Roles",
      "crud",
      "rol",

      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Permisos Rol",
      "crud",
      "permisos_rol",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Permisos",
      "crud",
      "permisos",
      "fas fa-tachometer-alt"
    ),
    new Enlace_Menu(
      "Gestionar Permisos por ROL",
      "CHECKEABLE",
      "parcela",
      "fas fa-tachometer-alt"
    ), new Enlace_Menu(
      "Gestionar Permisos por rol APP ",
      "CHECKEABLE",
      "parcela",
      "fas fa-tachometer-alt"
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
