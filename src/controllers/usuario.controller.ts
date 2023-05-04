// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors, post, requestBody
} from '@loopback/rest';
import {verify} from 'argon2';

import {Debug} from '../helpers/debug';
import {Credentials} from '../models/models/Credentials';
import {IAuthResponse} from '../models/models/IAuthResponse';
import {RolRepository, UsuarioRepository} from '../repositories';
const crypto = require('crypto');


const salt = "54zr9SBd4k2qO03Ezp#%qf9BM2Cm9xfPg94%P^&$NHV@qczuXE";
const fecha_reiniciar = new Date(0);



export function sha256(text: any) {
  const sha256 = crypto.createHash('sha256');
  sha256.update(text);
  return sha256.digest('hex');
}

export class UsuarioController {
  constructor(
    @repository(UsuarioRepository) public usuariosRepository: UsuarioRepository,
    @repository(RolRepository) public rolRepository: RolRepository,
  ) { }


  @post('/usuario/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
              username: {
                type: 'string',
              },
              password: {
                type: 'string',
              },
            },
          },
        },
      },
    })
    credentials: Credentials,
  ): Promise<IAuthResponse> {
    const {username, password} = credentials;
    const usuario = await this.usuariosRepository.findOne({where: {usuario_email: username}});
    if (!usuario) {
      throw new HttpErrors.Unauthorized('Credenciales invalidas');
    }
    const numero_fallos_permitidos = [5, 15];
    const passwordMatched = await verify(usuario.usuario_contrasenya, password);
    if (!passwordMatched) {
      usuario.usuario_intentos_fallidos = usuario.usuario_intentos_fallidos + 1;
      if (usuario.usuario_intentos_fallidos > numero_fallos_permitidos[0] && usuario.usuario_tipo_bloqueo == "ninguno") {
        usuario.usuario_fecha_bloqueo = this.sumar_minutos_fecha_actual(5);
        //usuario.intentos_fallidos = 0;
        usuario.usuario_tipo_bloqueo = "temporal";
      }
      const fecha_bloqueo = usuario.usuario_fecha_bloqueo ? usuario.usuario_fecha_bloqueo : new Date();

      if (this.comprobar_cad_fecha(fecha_bloqueo) == false && usuario.usuario_tipo_bloqueo == "temporal") {
        usuario.usuario_intentos_fallidos = 0;
        usuario.usuario_tipo_bloqueo = "ninguno";
      }
      await this.usuariosRepository.updateById(usuario.usuario_id, usuario);
      if (usuario.usuario_intentos_fallidos > numero_fallos_permitidos[0] || usuario.usuario_tipo_bloqueo == "temporal") {
        return {
          message: "El usuario esta bloqueado temporalmente, prueva más tarde"
        }
      }
      let numFallosRestantes = numero_fallos_permitidos[0] - usuario.usuario_intentos_fallidos;
      throw new HttpErrors.Unauthorized('Credenciales invalidas, si falla ' + numFallosRestantes + " veces más se bloqueara el usuario unos minutos ");
    }
    const randomBytes = crypto.randomBytes(128).toString('hex');
    const token = sha256(randomBytes);
    Debug.log("Token generado:", token);
    let response: IAuthResponse = {};
    switch (usuario.usuario_tipo_bloqueo) {
      case "ninguno":
        usuario.usuario_intentos_fallidos = 0;
        usuario.usuario_tipo_bloqueo = "ninguno";

        usuario.usuario_token = token;
        usuario.usuario_fecha_bloqueo = fecha_reiniciar;
        usuario.usuario_cad_token = this.sumar_dias_fecha_actual(1);
        response = {
          usuario_email: usuario.usuario_email,
          usuario_token: token,
          usuario_rol: await this.rolRepository.findById(usuario.usuario_rol_id)
        };
        Debug.log("ninguno:", response);
        break;
      case "temporal":
        const fecha_bloqueo = usuario.usuario_fecha_bloqueo ? usuario.usuario_fecha_bloqueo : new Date();
        if (this.comprobar_cad_fecha(fecha_bloqueo) == false) {
          usuario.usuario_intentos_fallidos = 0;
          usuario.usuario_tipo_bloqueo = "ninguno";

          usuario.usuario_fecha_bloqueo = fecha_reiniciar;
          usuario.usuario_cad_token = this.sumar_dias_fecha_actual(1);
          response = {
            usuario_email: usuario.usuario_email,
            usuario_token: token,
            usuario_rol: await this.rolRepository.findById(usuario.usuario_rol_id)
          };
        } else {
          response = {
            message: "El usuario esta bloqueado temporalmente prueva más tarde"
          }
        }

        break;
      default:
        break;
    }
    await this.usuariosRepository.updateById(usuario.usuario_id, usuario);
    return response;
  }


  private comprobar_cad_fecha(fecha: Date): boolean {
    const ahora = new Date();

    return fecha.getTime() > ahora.getTime();
  }


  private sumar_dias_fecha_actual(dias_sumar: number) {
    let fecha = new Date();
    let f_div = this.dividir_fecha(fecha);//Fecha Dividida
    f_div.dia = f_div.dia + dias_sumar;
    let fecha_dev = this.fecha_to_string(f_div);
    fecha = new Date(fecha_dev);
    return fecha;
  }

  private sumar_minutos_fecha_actual(minutos: number) {

    let fecha = new Date();
    let f_div = this.dividir_fecha(fecha);//Fecha Dividida

    f_div.minutos = f_div.minutos + minutos;
    let fecha_dev = this.fecha_to_string(f_div);
    fecha = new Date(fecha_dev);
    return fecha;
  }

  private fecha_to_string(f_div: any) {
    let fecha_dev =
      f_div.anyo + "-";
    if (f_div.mes < 10) {
      fecha_dev =
        fecha_dev + 0 +
        f_div.mes + "-";
    } else {
      fecha_dev =
        fecha_dev +
        f_div.mes + "-";
    }

    if (f_div.dia < 10) {
      fecha_dev =
        fecha_dev + 0 +
        f_div.dia + " ";
    } else {
      fecha_dev =
        fecha_dev +
        f_div.dia + " ";
    }

    fecha_dev =
      fecha_dev +
      f_div.hora + ":" +
      f_div.minutos + ":" +
      f_div.segundos;

    return fecha_dev;
  }

  /*
  *       Dividir fecha
    Este metodo se encarga de divir la fecha en variables separadas que se devuelven
    en un opjeto para facilitar las tareas de realizar operaciones matematicas
  */
  private dividir_fecha(fecha: Date) {
    let object = {
      "anyo": fecha.getFullYear(),
      "mes": fecha.getMonth() + 1,
      "dia": fecha.getDate(),
      "hora": fecha.getHours(),
      "minutos": fecha.getMinutes(),
      "segundos": fecha.getSeconds(),
      "milesegundos": fecha.getMilliseconds()
    };
    return object;
  }
}
