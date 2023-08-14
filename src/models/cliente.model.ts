import {Entity, model, property} from '@loopback/repository';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true
  })
  cliente_id?: number;

  @property({
    type: 'string',
    required: true
  })
  cliente_nombre: string;

  @property({
    type: 'string',
    required: true
  })
  cliente_mote: string;

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
