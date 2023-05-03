import {
  AuthenticationStrategy
} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {App} from './models/app.model';
import {AppRepository, PermisosDeRolAppRepository, PermisosRepository, PermisosRolRepository} from './repositories';

export class APPAuthenticationStrategy implements AuthenticationStrategy {
  name = 'App';

  constructor(
    @repository(AppRepository) protected appRepository: AppRepository,
    @repository(PermisosDeRolAppRepository) public rolAppRepository: PermisosDeRolAppRepository,
    @repository(PermisosRolRepository) public permisosRolRepository: PermisosRolRepository,
    @repository(PermisosRepository) public permisosRepository: PermisosRepository
  ) { }

  async authenticate(request: Request): Promise<App | undefined | any> {
    const app_token = this.extractAPPKey(request);
    console.log("app_token:", app_token);
    const foundAPP = await this.appRepository.findOne({
      where: {app_token: app_token},
    });

    console.log("foundAPP:", foundAPP);

    const foundRolApp = await this.rolAppRepository.find({
      where: {
        permisos_de_rol_app_app_id: foundAPP?.app_id
      }
    });
    console.log("foundAPPRol:", foundRolApp);
    var foundPermisosApp = [];
    for (let index = 0; index < foundRolApp.length; index++) {
      var permisos = await this.permisosRolRepository.find({
        where: {
          permisos_rol_rol_id: foundRolApp[index].permisos_de_rol_app_rol_id
        },
      });
      var permisosA = {};
      for (let index = 0; index < permisos.length; index++) {
        let element = permisos[index];
        const permiso = await this.permisosRepository.findOne({
          where: {
            permisos_id: permisos[index].permisos_rol_permisos_id
          },
        });
        permisosA = {
          permisos_rol_id: element.permisos_rol_id,
          permisos_rol_rol_id: element.permisos_rol_rol_id,
          permisos_rol_permisos_id: permiso,
          permisos_rol_permitido: element.permisos_rol_permitido
        };
        foundPermisosApp.push(permisosA);
      }


    }
    //console.log("foundPermisosApp:", foundPermisosApp);

    //console.log(foundPermisosApp);
    if (!foundAPP) {
      return {error: `Invalid token of app`};
    }
    if (foundAPP.app_cad_token && !this.comprobar_cad_fecha(new Date(foundAPP.app_cad_token))) {
      return {error: `Actualiza la aplicacion`};
    }


    return foundPermisosApp;
    //return {id: foundUser.id?.toString(), name: foundUser.username};

  }

  private comprobar_cad_fecha(fecha: Date): boolean {
    const ahora = new Date();

    return ahora.getTime() <= fecha.getTime();
  }

  extractAPPKey(request: Request): string {
    //console.log("headers: ", request.headers);
    // console.log("appKey: ", request.headers.appkey);
    if (!request.headers["appkey"]) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
      //throw new HttpErrors.Unauthorized(`Que no funca animal`);
    }

    const authHeaderValue = request.headers['appkey'].toString();

    const token = authHeaderValue;
    //console.log("Token en extract APP Key: ", token);
    return token;
  }
}
