import {Configuracion_View} from '../cofiguracion_view';
import {Enlace_Menu} from './enlace_menu';

export class Elementos_menu {
  constructor() {

  }

  private static lista_elementos: Enlace_Menu[] = [
    new Enlace_Menu(
      "Planificación",
      "planificar",
      "planificacion",
      "fa fa-calendar",
      new Configuracion_View(
        [],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Ver Planificación",
      "planificar",
      "desplegable",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Ver Planificación En Campo",
      "planificar",
      "desplegable",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Resumen planificacion",
      "desplegable",
      "producto",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Clientes",
      "crud",
      "cliente",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [{
          nombre_campo: "cliente_nombre",
          nombre_visible: "Nombre del Cliente",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: false,
        },
        {
          nombre_campo: "cliente_mote",
          nombre_visible: "Mote cliente",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: false

        }
        ],
        [],
        []
      )
    ), new Enlace_Menu(
      "Usuarios",
      "crud",
      "usuario",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [{
          nombre_campo: "usuario_email",
          nombre_visible: "Email",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: false,
        },
        {
          nombre_campo: "usuario_medida_id",
          nombre_visible: "Nombre de la unidad de medida",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: true

        },
        {
          nombre_campo: "usuario_rol_id",
          nombre_visible: "Nombre del rol",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "rol_id",
            nombre_tabla: "rol",
          },
          campo_mostrar: {
            nombre_campo: "rol_nombre",
            nombre_tabla: "rol",
          },
          autocompletar: true
        },
        {
          nombre_campo: "usuario_contrasenya",
          nombre_visible: "Contraseña del usuario",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "rol_id",
            nombre_tabla: "rol",
          },
          campo_mostrar: {
            nombre_campo: "rol_nombre",
            nombre_tabla: "rol",
          },
          autocompletar: false
        },
        ],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Productos",
      "crud",
      "producto",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [{
          nombre_campo: "productos_numero_registro",
          nombre_visible: "Numero de registro",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          campo_mostrar: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          autocompletar: false,
        },
        {
          nombre_campo: "productos_nombre",
          nombre_visible: "Nombre de producto",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: false
        },
        {
          nombre_campo: "productos_precio",
          nombre_visible: "Introduce un precio",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "rol_id",
            nombre_tabla: "rol",
          },
          campo_mostrar: {
            nombre_campo: "rol_nombre",
            nombre_tabla: "rol",
          },
          autocompletar: true
        }
        ],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Campos",
      "crud",
      "campo",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [{
          nombre_campo: "campo_nombre",
          nombre_visible: "Email",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: false,
        },
        {
          nombre_campo: "campo_tamanyo_facturacion",
          nombre_visible: "Tamaño facturación",
          tipo_input: "number",
          campo_referenciado: {
            nombre_campo: "medida_id",
            nombre_tabla: "unidad_medida",
          },
          campo_mostrar: {
            nombre_campo: "medida_nombre",
            nombre_tabla: "unidad_medida",
          },
          autocompletar: false

        },
        {
          nombre_campo: "campo_cliente_id",
          nombre_visible: "Nombre cliente",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "cliente_id",
            nombre_tabla: "cliente",
          },
          campo_mostrar: {
            nombre_campo: "cliente_nombre",
            nombre_tabla: "cliente",
          },
          autocompletar: true
        }
        ],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Parcelas",
      "crud",
      "parcela",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [{
          nombre_campo: "parcelas_poligono",
          nombre_visible: "Poligono",
          tipo_input: "number",
          campo_referenciado: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          campo_mostrar: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          autocompletar: false,
        },
        {
          nombre_campo: "parcelas_parcela",
          nombre_visible: "Parcela",
          tipo_input: "number",
          campo_referenciado: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          campo_mostrar: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          autocompletar: false
        },
        {
          nombre_campo: "parcelas_provincia",
          nombre_visible: "Numero provincia",
          tipo_input: "number",
          campo_referenciado: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          campo_mostrar: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          autocompletar: false
        },
        {
          nombre_campo: "parcelas_municipio",
          nombre_visible: "Numero de Municipio",
          tipo_input: "number",
          campo_referenciado: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          campo_mostrar: {
            nombre_campo: "",
            nombre_tabla: "",
          },
          autocompletar: false
        },
        {
          nombre_campo: "parcelas_campo_id",
          nombre_visible: "Nombre de campo",
          tipo_input: "text",
          campo_referenciado: {
            nombre_campo: "campo_id",
            nombre_tabla: "campo",
          },
          campo_mostrar: {
            nombre_campo: "campo_nombre",
            nombre_tabla: "campo",
          },
          autocompletar: true
        }
        ],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Versiones App",
      "app",
      "crud",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Rol APP",
      "crud",
      "permisos_de_rol_app",
      "fas fa-tachometer-alt",

    ),
    new Enlace_Menu(
      "Roles",
      "crud",
      "rol",
      "fas fa-tachometer-alt",

    ),
    new Enlace_Menu(
      "Permisos Rol",
      "crud",
      "permisos_rol",
      "fas fa-tachometer-alt",

    ),
    new Enlace_Menu(
      "Permisos",
      "crud",
      "permisos",
      "fas fa-tachometer-alt",
      new Configuracion_View(
        [],
        [],
        []
      )
    ),
    new Enlace_Menu(
      "Gestionar Permisos por ROL",
      "CHECKEABLE",
      "parcela",
      "fas fa-tachometer-alt",

    ), new Enlace_Menu(
      "Gestionar Permisos por rol APP ",
      "CHECKEABLE",
      "parcela",
      "fas fa-tachometer-alt",
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
