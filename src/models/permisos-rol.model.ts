import {Entity, belongsTo, model, property} from '@loopback/repository';
import {Permisos} from './permisos.model';

@model()
export class Permisos_Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  permisos_rol_id?: number;

  @property({
    type: 'number',
    requiered: true
  })
  permisos_rol_rol_id: number;

  @belongsTo(() => Permisos, {keyFrom: "permisos_id"}, {name: "permisos_id"})
  permisos_rol_permisos_id: number;

  @property({
    type: 'number',
    default: 0,
  })
  permisos_rol_permitido?: number;


  constructor(data?: Partial<Permisos_Rol>) {
    super(data);
  }
}

export interface PermisosRolRelations {
  // describe navigational properties here

}

export type PermisosRolWithRelations = Permisos_Rol & PermisosRolRelations;
