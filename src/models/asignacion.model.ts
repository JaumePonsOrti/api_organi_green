import {Entity, model, property} from '@loopback/repository';

@model()
export class Asignacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  asignacion_id?: number;

  @property({
    type: 'number',
    required: true,
  })
  asignacion_usuario_id: number;

  @property({
    type: 'number',
    required: true,
  })
  asignacion_planificacion_id: number;


  constructor(data?: Partial<Asignacion>) {
    super(data);
  }
}

export interface AsignacionRelations {
  // describe navigational properties here
}

export type AsignacionWithRelations = Asignacion & AsignacionRelations;
