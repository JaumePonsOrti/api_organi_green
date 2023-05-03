import {Entity, model, property} from '@loopback/repository';

@model()
export class Usuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  usuario_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  usuario_contrasenya: string;

  @property({
    type: 'string',
    required: true,
  })
  usuario_email: string;

  @property({
    type: 'string',
  })
  usuario_token?: string;

  @property({
    type: 'date',
  })
  usuario_cad_token: Date;

  @property({
    type: 'number',
  })
  usuario_intentos_fallidos: number;

  @property({
    type: 'date',
  })
  usuario_fecha_bloqueo: Date;

  @property({
    type: 'date',
  })
  usuario_tipo_bloqueo?: string;

  @property({
    type: 'string',
  })
  usuario_token_recuperar_pass?: string;

  @property({
    type: 'date',
  })
  usuario_cad_token_recuperacion?: string;

  @property({
    type: 'number',
  })
  usuario_medida_id?: number;

  @property({
    type: 'number',
  })
  usuario_rol?: number;


  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
