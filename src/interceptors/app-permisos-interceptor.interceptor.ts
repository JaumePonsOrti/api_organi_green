import {
  globalInterceptor,
  inject,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  ValueOrPromise,
} from '@loopback/core';
import {HttpErrors, Request, RestBindings} from '@loopback/rest';
import {APPAuthenticationStrategy} from '../app-strategy';

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('auth', {tags: {name: 'AppPermisosInterceptor'}})
export class AppPermisosInterceptorInterceptor implements Provider<Interceptor> {

  constructor(
    //@inject('authentication.strategies.bearer') protected bearerStrategy: BearerAuthenticationStrategy,
    @inject('authentication.strategies.app') protected appStrategy: APPAuthenticationStrategy,
    @inject(RestBindings.Http.REQUEST) protected request: Request,
  ) { }


  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      var appVerifyResult = await this.appStrategy.authenticate(this.request);
      //console.log(appVerifyResult);
      if (appVerifyResult.error) {
        throw new HttpErrors.Unauthorized(appVerifyResult.error);
      }
      // Add pre-invocation logic here
      const result = await next();
      console.log(result);
      // Add post-invocation logic here
      return result;
    } catch (err) {
      // Add error handling logic here
      throw err;
    }
  }
}