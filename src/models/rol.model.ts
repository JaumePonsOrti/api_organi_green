import {Entity, model, property} from '@loopback/repository';

@model()
export class Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  rol_id?: number;

  @property({
    type: 'string',
  })
  rol_nombre?: string;

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
