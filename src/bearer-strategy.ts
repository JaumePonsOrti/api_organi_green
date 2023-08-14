import {
  AuthenticationStrategy
} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {RequestHelper} from './helpers/request.helper';
import {Usuario} from './models';
import {PermisosRolRepository, UsuarioRepository} from './repositories';

export class BearerAuthenticationStrategy implements AuthenticationStrategy {
  name = 'Bearer';
  public static CURRENT_USER: Usuario;

  constructor(
    @repository(UsuarioRepository) protected userRepository: UsuarioRepository,
    @repository(PermisosRolRepository) public permisosRolRepository: PermisosRolRepository
  ) { }

  public accesoPermitidoSinToken(request: Request) {
    //Primero se comprueba si es el metodo login o no
    const partes = RequestHelper.getRequestPorPartes(request);
    const accesoSinTokenPermitido =
      partes[0] == "usuario" && partes[1] && partes[1] == "login" ||
      partes[0] === "ping"
      ;//|| partes[0] == "usuario" && partes[1] && partes[1] == "recuperar_password";

    //console.log("Acceso Sin Token Permitido:", accesoSinTokenPermitido);

    return accesoSinTokenPermitido;

  }

  async authenticate(request: Request): Promise<Usuario | undefined | any> {
    //Primero se comprueba si es el metodo login o no
    if (this.accesoPermitidoSinToken(request)) {
      return true;
    }

    const token = this.extractCredentials(request) ?? "";

    const foundUser = await this.userRepository.findOne({
      where: {usuario_token: token},
    });



    //console.log("USUARIO:", foundUser);

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(`Invalid token`);
    }

    if (!this.comprobar_cad_fecha(foundUser.usuario_cad_token)) {
      throw new HttpErrors.Unauthorized(`Invalid token`);
    }
    var requestHelper = new RequestHelper(this.permisosRolRepository);
    if (await !requestHelper.valiadateRequestIfIsPermitedSearchingByRequest(request, foundUser)) {
      throw new HttpErrors.Unauthorized(`Invalid auth`);
    }
    BearerAuthenticationStrategy.CURRENT_USER = foundUser;

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
    console.log(parts);
    if (parts.length !== 2)
      throw new HttpErrors.Unauthorized(
        `Authorization header value has too many parts. It must follow the pattern: 'Bearer <user token>' where <token> is a string.`,
      );
    const token = parts[1];

    return token;
  }

}
