import {Entity, model, property} from '@loopback/repository';

@model()
export class Planificacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  planificacion_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  planificacion_id_campo: number;

  @property({
    type: 'date',
  })
  planificacion_fecha_realizar?: string;

  @property({
    type: 'date',
  })
  planificacion_timestamp_inicio?: string;

  @property({
    type: 'date',
  })
  planificacion_timestamp_final?: string;

  @property({
    type: 'number',
    required: true,
  })
  planificacion_estado: number;

  constructor(data?: Partial<Planificacion>) {
    super(data);
  }
}


export interface PlanificacionRelations {
  // describe navigational properties here
}

export type PlanificacionWithRelations = Planificacion & PlanificacionRelations;
