import {Configuracion_Input} from "./Config_input";


export class Configuracion_View {
  crear: Configuracion_Input[];
  editar: Configuracion_Input[];
  borrar: any[];
  constructor(crear: Configuracion_Input[], editar: Configuracion_Input[], borrar: any[]) {
    this.crear = crear;
    this.editar = editar;
    this.borrar = borrar;
  }
}
