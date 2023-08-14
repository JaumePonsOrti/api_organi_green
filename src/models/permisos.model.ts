import {Entity, model, property} from '@loopback/repository';

@model()
export class Permisos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  permisos_id: number;

  @property({
    type: 'string',
  })
  permisos_nombre_controlador?: string;

  @property({
    type: 'string',
    required: true,
  })
  permisos_nombre_funcion: string;


  constructor(data?: Partial<Permisos>) {
    super(data);
  }
}

export interface PermisosRelations {
  // describe navigational properties here
}

export type PermisosWithRelations = Permisos & PermisosRelations;
