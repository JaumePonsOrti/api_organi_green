import {Provider} from '@loopback/context';
import {repository} from '@loopback/repository';
import {APPAuthenticationStrategy} from './app-strategy';
import {AppRepository} from './repositories';


export class AppAuthenticationStrategyProvider
  implements Provider<APPAuthenticationStrategy> {
  constructor(
    @repository(AppRepository) protected userRepository: AppRepository,) { }

  value(): APPAuthenticationStrategy {
    return new APPAuthenticationStrategy(this.userRepository);
  }
}

