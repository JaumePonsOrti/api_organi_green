import {
  AuthenticationStrategy
} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {Usuario} from './models';
import {UsuarioRepository} from './repositories';

export class BearerAuthenticationStrategy implements AuthenticationStrategy {
  name = 'Bearer';

  constructor(
    @repository(UsuarioRepository) protected userRepository: UsuarioRepository,
  ) { }

  async authenticate(request: Request): Promise<Usuario | undefined | any> {
    const token = this.extractCredentials(request) ?? "";

    const foundUser = await this.userRepository.findOne({
      //where: {token},
    });

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(`Invalid token`);
    }
    /*
    if (!this.comprobar_cad_fecha(foundUser.cad_token)) {
      throw new HttpErrors.Unauthorized(`Invalid token`);
    }
    */

    return foundUser;
    //return {id: foundUser.id?.toString(), name: foundUser.username};

  }

  private comprobar_cad_fecha(fecha: Date): boolean {
    const ahora = new Date();

    return ahora.getTime() <= fecha.getTime();
  }

  extractCredentials(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }


    const authHeaderValue = request.headers.authorization;

    if (!authHeaderValue.startsWith('Bearer')) {
      throw new HttpErrors.Unauthorized(
        `Authorization header is not of type 'Bearer'.`,
      );
    }

    const parts = authHeaderValue.split(' ');
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer <token>' where <token> is a string.`,
      );
    const token = parts[1];

    return token;
  }

  extractAPPKey(request: Request): string {
    if (!request.headers.authorization) {
      throw new HttpErrors.Unauthorized(`Authorization header not found.`);
    }


    const authHeaderValue = request.headers.appKey ?? [""];


    const token = authHeaderValue[0];

    return token;
  }
}
