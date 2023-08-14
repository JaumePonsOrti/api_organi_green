import {Entity, model, property} from '@loopback/repository';

@model()
export class Productos_Planificados extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  productos_planificados_id?: number;

  @property({
    type: 'number',
  })
  productos_planificados_id_producto: number;

  @property({
    type: 'number',

  })
  productos_planificados_id_planificacion: number;

  @property({
    type: 'string',
  })
  productos_planificados_numero_de_lote?: string;

  @property({
    type: 'number',

  })
  productos_planificados_producto_dueño: number;

  constructor(data?: Partial<Productos_Planificados>) {
    super(data);
  }
}


export interface ProductosPlanificadosRelations {
  // describe navigational properties here
}

export type ProductosPlanificadosWithRelations = Productos_Planificados & ProductosPlanificadosRelations;
