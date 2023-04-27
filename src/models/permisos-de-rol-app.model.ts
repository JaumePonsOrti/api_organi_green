import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class PermisosDeRolApp extends Entity {
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

  constructor(data?: Partial<PermisosDeRolApp>) {
    super(data);
  }
}

export interface PermisosDeRolAppRelations {
  // describe navigational properties here
}

export type PermisosDeRolAppWithRelations = PermisosDeRolApp & PermisosDeRolAppRelations;
