import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Permisos_De_Rol_App extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  permisos_de_rol_app_id?: number;

  @property({
    type: 'number',
  })
  permisos_de_rol_app_app_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  permisos_de_rol_app_rol_id: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Permisos_De_Rol_App>) {
    super(data);
  }
}

export interface Permisos_De_Rol_App_Relations {
  // describe navigational properties here
}

export type PermisosDeRolAppWithRelations = Permisos_De_Rol_App & Permisos_De_Rol_App_Relations;
