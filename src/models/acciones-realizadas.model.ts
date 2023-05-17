import {Entity, model, property} from '@loopback/repository';
@model({settings: {strict: false}})
export class AccionesRealizadas extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  acciones_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  acciones_id_tabla: string;

  @property({
    type: 'string',
    required: true,
  })
  acciones_tabla_acción: string;

  @property({
    type: 'string',
    required: true,
  })
  acciones_tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  acciones_id_usuario_realiza: number;

  @property({
    type: 'number',
    required: true,
  })
  acciones_id_app: number;

  @property({
    type: 'string',
  })
  acciones_valor_antiguo?: string;

  @property({
    type: 'string',

  })
  acciones_valor_nuevo?: string;

  constructor(data?: Partial<AccionesRealizadas>) {
    super(data);
  }
}

export interface AccionesRealizadasRelations {
  // describe navigational properties here
}

export type AccionesRealizadasWithRelations = AccionesRealizadas & AccionesRealizadasRelations;
