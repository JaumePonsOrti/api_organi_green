import {
  AuthenticationStrategy
} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {App} from './models/app.model';
import {AppRepository, RolRepository} from './repositories';

export class APPAuthenticationStrategy implements AuthenticationStrategy {
  name = 'App';

  constructor(
    @repository(RolRepository) protected userRepository: AppRepository,
  ) { }

  async authenticate(request: Request): Promise<App | undefined | any> {
    const app_token = this.extractAPPKey(request);

    const foundAPP = await this.userRepository.findOne({
      where: {app_token},
    });

    if (!foundAPP) {
      throw new HttpErrors.Unauthorized(`Invalid token`);
    }
    if (!this.comprobar_cad_fecha(foundAPP.app_cad_token)) {
      throw new HttpErrors.Unauthorized(`Actualiza la aplicacion`);
    }


    return foundAPP;
    //return {id: foundUser.id?.toString(), name: foundUser.username};

  }

  private comprobar_cad_fecha(fecha: Date): boolean {
    const ahora = new Date();

    return ahora.getTime() <= fecha.getTime();
  }

  extractAPPKey(request: Request): string {
    if (!request.headers.appKey) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }


    const authHeaderValue = request.headers.appKey ?? [""];


    const token = authHeaderValue[0];

    return token;
  }
}
