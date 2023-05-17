import {Entity, model, property} from '@loopback/repository';

@model()
export class Parcelas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  parcelas_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  parcelas_poligono: number;

  @property({
    type: 'number',
    required: true,
  })
  parcelas_parcela: number;

  @property({
    type: 'number',
    required: true,
  })
  parcelas_provincia: number;

  @property({
    type: 'number',
    required: true,
  })
  parcelas_municipio: number;

  @property({
    type: 'number',
    required: true,
  })
  parcelas_campo_id: number;

  @property({
    type: 'number',
    required: true,
  })
  tamanyo_m2: number;

  constructor(data?: Partial<Parcelas>) {
    super(data);
  }
}
export interface ParcelasRelations {
  // describe navigational properties here
}

export type ParcelasWithRelations = Parcelas & ParcelasRelations;
