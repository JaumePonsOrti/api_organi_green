import {Rol} from '../rol.model'

export interface IAuthResponse {
  usuario_email?: string,
  usuario_token?: string,
  usuario_rol?: Rol,
  message?: string
}
