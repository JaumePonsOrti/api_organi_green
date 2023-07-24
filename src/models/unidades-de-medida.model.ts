import {Entity, model, property} from '@loopback/repository';

@model()
export class Unidades_De_Medida extends Entity {
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

  constructor(data?: Partial<Unidades_De_Medida>) {
    super(data);
  }
}

export interface Unidades_De_MedidaRelations {
  // describe navigational properties here
}

export type Unidades_De_MedidaWithRelations = Unidades_De_Medida & Unidades_De_MedidaRelations;
