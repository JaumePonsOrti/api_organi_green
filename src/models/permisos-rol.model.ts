import {Entity, model, property} from '@loopback/repository';

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

  @property({
    type: 'number',

  })
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
}
export type PermisosRolWithRelations = Permisos_Rol & PermisosRolRelations;
