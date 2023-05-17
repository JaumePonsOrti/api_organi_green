import {Entity, model, property} from '@loopback/repository';

@model()
export class Campo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  campo_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  campo_nombre: string;

  @property({
    type: 'number',
    required: true
  })
  campo_tamanyo_facturacion: number;

  @property({
    type: 'number',
    required: true
  })
  campo_cliente_id: number;

  constructor(data?: Partial<Campo>) {
    super(data);
  }
}

export interface CampoRelations {
  // describe navigational properties here
}

export type CampoWithRelations = Campo & CampoRelations;
