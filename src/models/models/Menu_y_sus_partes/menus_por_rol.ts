import {Elementos_menu} from './elementos_menu';
import {Enlace_Menu} from './enlace_menu';

export class Menus_por_rol {
  private enlaces_menu_disponible: Enlace_Menu[] = Elementos_menu.getLista();
  constructor() {

  }
  /**
* ____________  Lista enlaces disponible ________________
* 0: Planificación
* 1: Ver Planificación
* 2: Ver Planificación EN CAMPO
* 3: Resumen planificacion
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
  public elementoPorRol_Nombre: any = {
    "Sistema": [
      this.enlaces_menu_disponible[0],
      this.enlaces_menu_disponible[1],
      this.enlaces_menu_disponible[2],
      this.enlaces_menu_disponible[3],
      this.enlaces_menu_disponible[4],
      this.enlaces_menu_disponible[5],
      this.enlaces_menu_disponible[6],
      this.enlaces_menu_disponible[7],
      this.enlaces_menu_disponible[8],
      this.enlaces_menu_disponible[9],
      this.enlaces_menu_disponible[10],
      this.enlaces_menu_disponible[11],
      this.enlaces_menu_disponible[12],
      this.enlaces_menu_disponible[13],
      this.enlaces_menu_disponible[14],
      this.enlaces_menu_disponible[15]
    ],
    "Admin": [
      this.enlaces_menu_disponible[0],
      this.enlaces_menu_disponible[1],
      this.enlaces_menu_disponible[2],
      this.enlaces_menu_disponible[3],
      this.enlaces_menu_disponible[4],
      this.enlaces_menu_disponible[5],
      this.enlaces_menu_disponible[6],
      this.enlaces_menu_disponible[7],
      this.enlaces_menu_disponible[8],
    ],
    "Sin_Loguear": [],
    "Trabajador_de_Campo": [

      this.enlaces_menu_disponible[2],
      this.enlaces_menu_disponible[3],
    ]
  };

  public elementoPorRol_id: any = {
    8: this.elementoPorRol_Nombre.Sistema,
    1: this.elementoPorRol_Nombre.Admin,
    4: this.elementoPorRol_Nombre.Trabajador_de_Campo,
    6: this.elementoPorRol_Nombre.Sin_Loguear
  }

}
