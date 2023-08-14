import {AuthenticationComponent, registerAuthenticationStrategy} from '@loopback/authentication';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {
  RestExplorerBindings,
  RestExplorerComponent
} from '@loopback/rest-explorer';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {APPAuthenticationStrategy} from './app-strategy';
import {BearerAuthenticationStrategy} from './bearer-strategy';
import {Elementos_menu, Enlace_Menu, Menus_por_rol} from './models';
import {MySequence} from './sequence';
export {ApplicationConfig};
export class ApiOrganiGreenApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {

  }) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
    //ANADIR Menu_por_rol
    this.bind('models.models.Menu_y_sus_partes.Enlace_Menu').toClass(Enlace_Menu);
    //ANADIR Elementos_menu
    this.bind('models.models.Menu_y_sus_partes.Elementos_menu').toClass(Elementos_menu);
    //ANADIR Menu_por_rol
    this.bind('models.models.Menu_y_sus_partes.Menu_Por_Rol').toClass(Menus_por_rol);


    //Añadir accion de la estrategia a la app
    this.bind('authentication.strategies.bearer').toClass(BearerAuthenticationStrategy);
    // Register your custom authentication strategy
    registerAuthenticationStrategy(this, BearerAuthenticationStrategy);
    //Añadir accion de la estrategia a la app
    this.bind('authentication.strategies.app').toClass(APPAuthenticationStrategy);
    // Register your custom authentication strategy
    registerAuthenticationStrategy(this, BearerAuthenticationStrategy);
    //Mount authentication system
    this.component(AuthenticationComponent);
  }
}
