import {Entity, model, property} from '@loopback/repository';


@model()
export class Productos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  productos_id?: number;

  @property({
    type: 'string',
  })
  productos_numero_registro?: string;

  @property({
    type: 'string',
    required: true,
  })
  productos_nombre: string;

  @property({
    type: 'number',
    required: true,
  })
  productos_precio: number;

  @property({
    type: 'number',
    required: true,
  })
  productos_cantidad_referenciada: number;

  @property({
    type: 'number',
    required: true,
  })
  productos_medida_id: number;

  @property({
    type: 'date',
  })
  productos_timestamp_actualizacion?: string;

  @property({
    type: 'number',
    required: true,
  })
  productos_subido: number;

  constructor(data?: Partial<Productos>) {
    super(data);
  }
}
export interface ProductosRelations {
  // describe navigational properties here
}

export type ProductosWithRelations = Productos & ProductosRelations;
