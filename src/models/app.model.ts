import {Entity, model, property} from '@loopback/repository';

@model()
export class App extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  app_id?: number;

  @property({
    type: 'string',
  })
  app_token: string;

  @property({
    type: 'number',
  })
  app_version_app?: number;

  @property({
    type: 'number',
  })
  app_sistema_version?: number;

  @property({
    type: 'date',
  })
  app_cad_token: Date;


  constructor(data?: Partial<App>) {
    super(data);
  }
}

export interface AppRelations {
  // describe navigational properties here
}

export type AppWithRelations = App & AppRelations;
