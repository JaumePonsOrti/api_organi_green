import {Entity, model, property} from '@loopback/repository';

@model()
export class UnidadesDeMedida extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  medida_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  medida_nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  medida_simbolo: string;

  @property({
    type: 'number',
    required: true,
  })
  medida_metros_cuadrados: number;

  @property({
    type: 'string',
    required: true,
  })
  medida_region: string;

  constructor(data?: Partial<UnidadesDeMedida>) {
    super(data);
  }
}

export interface UnidadesDeMedidaRelations {
  // describe navigational properties here
}

export type UnidadesDeMedidaWithRelations = UnidadesDeMedida & UnidadesDeMedidaRelations;
