import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {BearerAuthenticationStrategy} from './bearer-strategy';
import {PermisosRolRepository, UsuarioRepository} from './repositories';


export class BearerAuthenticationStrategyProvider
  implements Provider<BearerAuthenticationStrategy> {
  constructor(
    @repository(UsuarioRepository) protected userRepository: UsuarioRepository,
    @repository(PermisosRolRepository) public permisosRolRepository: PermisosRolRepository
  ) { }

  value(): BearerAuthenticationStrategy {
    return new BearerAuthenticationStrategy(
      this.userRepository,
      this.permisosRolRepository
    );
  }
}


