import {Request} from '@loopback/rest';
import {Permisos} from '../models';

export class RequestHelper {
  constructor() {

  }
  public static getRequestPorPartes(request: Request) {

    console.log("request: ", request.url);
    let req = request.url.split("/");
    req = [req[1], req[2]];
    console.log(req);
    return req;
  }

  public static valiadateRequestIfIsPermited(req: Request, permisos: any[]) {
    let request = this.getRequestPorPartes(req);
    let returna = false;
    for (let index = 0; index < permisos.length; index++) {
      const permiso: Permisos = permisos[index].permisos_rol_permisos_id;
      console.log("permisos:", permisos);
      console.log(request, permiso);

      if (request[0] == permiso.permisos_nombre_controlador) {
        returna = true;
        console.log("request 0:", returna);
      }
      if (request[1] == permiso.permisos_nombre_funcion || typeof request[1] == "undefined") {
        returna = true;
        console.log("request 1:", returna);
      } else {
        returna = false;
        console.log("else request 1:", returna);
      }

    }
    return returna;
  }
}
