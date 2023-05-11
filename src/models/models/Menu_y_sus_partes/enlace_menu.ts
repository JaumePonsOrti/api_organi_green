class Enlace_Menu {
  /**
   *
   */
  constructor(
    nombre_del_campo: string,
    tipo_de_view: string,
    controlador: string,
    configuracion_view?: Configuracion_View) {
    this.nombre_del_campo = nombre_del_campo;
    this.tipo_de_view = tipo_de_view;
    this.controlador = controlador;
    if (typeof configuracion_view != "undefined") {
      this.configuracion_view = configuracion_view;
    }

  }


  nombre_del_campo: string;
  tipo_de_view: string;
  controlador: string;
  configuracion_view!: Configuracion_View;
}
