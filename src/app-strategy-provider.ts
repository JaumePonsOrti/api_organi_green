import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {APPAuthenticationStrategy} from './app-strategy';
import {AppRepository, PermisosDeRolAppRepository, PermisosRolRepository} from './repositories';


export class AppAuthenticationStrategyProvider
  implements Provider<APPAuthenticationStrategy> {
  constructor(
    @repository(AppRepository) protected userRepository: AppRepository,
    @repository(PermisosDeRolAppRepository) public rolAppRepository: PermisosDeRolAppRepository,
    @repository(PermisosRolRepository) public permisosRolRepository: PermisosRolRepository
  ) { }

  value(): APPAuthenticationStrategy {
    return new APPAuthenticationStrategy(this.userRepository,
      this.rolAppRepository,
      this.permisosRolRepository);
  }
}

