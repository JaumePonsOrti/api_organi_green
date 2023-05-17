import {Entity, model, property} from '@loopback/repository';

@model()
export class ProductosPlanificados extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  product_plan_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  product_plan_id_producto: number;

  @property({
    type: 'number',
    required: true,
  })
  product_plan_id_planificaion: number;

  @property({
    type: 'string',
  })
  product_plan_numero_de_lote?: string;

  @property({
    type: 'number',
    required: true,
  })
  product_plan_producto_dueño: number;

  constructor(data?: Partial<ProductosPlanificados>) {
    super(data);
  }
}


export interface ProductosPlanificadosRelations {
  // describe navigational properties here
}

export type ProductosPlanificadosWithRelations = ProductosPlanificados & ProductosPlanificadosRelations;
