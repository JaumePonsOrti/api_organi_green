import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import * as argon2 from "argon2";
import {APPAuthenticationStrategy} from '../app-strategy';
import {BearerAuthenticationStrategy} from '../bearer-strategy';
import {AccionesRealizadas, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class UsuarioCrudController {
  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository,
    @inject('controllers.AccionesRealizadasCrudController') public acciones: AccionesRealizadasCrudController

  ) { }

  //____________________________ METODOS CAN ACTIVATE ______________________________
  @get("/usuario/crear/can_activate")
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  })
  async can_activate_crear(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }

  @get('/usuario/contar/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_contar(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }

  @get('/usuario/ver/todos/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_ver_todos(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }

  @get('/usuario/ver/{id}/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object', properties: {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_ver(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }

  @get('/usuario/actualizar/todos/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_actualizar_todos(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }

  @get('/usuario/actualizar/{id}/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_actualizar() {
    return {can_activate: true};
  }

  @get('/usuario/remplazar/{id}/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_remplazar(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }
  @get('/usuario/borrar/{id}/can_activate')
  @response(200, {
    description: 'Se puede activar el metodo ver',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties:
          {
            can_activate: {type: 'boolean'}
          }
        }
      }
    },
  }) async can_activate_borrar(): Promise<{can_activate: boolean}> {
    return {can_activate: true};
  }

  @post('/usuario/crear')
  @response(200, {
    description: 'Usuario model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['usuario_email', 'usuario_rol_id', 'usuario_contrasenya'],
            properties: {
              usuario_email: {
                type: 'string',
              },
              usuario_medida_id: {
                type: 'number',
              },
              usuario_rol_id: {
                type: 'number',
              },
              usuario_contrasenya: {
                type: 'string',
              },
            },
          },
        },
      },
      /*content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuario',
            exclude: ['usuario_id'],
          }),
        },
      },*/
    })
    usuario: Omit<
      {
        usuario_email: 'string',
        usuario_medida_id: 'number',
        usuario_rol_id: 'number',
        usuario_contrasenya: 'string'
      },
      'usuario_id'>,
  ): Promise<Usuario | {
    "error": string,
    "message": string
  }> {
    console.log("request: ", usuario);
    //Se pasan los datos a una nueva variable
    let newUsuario = new Usuario();
    console.log("Post newUsuario: ", newUsuario);
    newUsuario.usuario_rol_id = parseInt(usuario.usuario_rol_id) ?? 6;
    newUsuario.usuario_email = usuario.usuario_email;
    newUsuario.usuario_medida_id = usuario.usuario_medida_id ? parseInt(usuario.usuario_medida_id) : 1;
    if (usuario.usuario_contrasenya.length < 8) {
      return {"error": "error_contrasenya_invalid", message: "La contrasea debe tener 8 caracteres."};
    }

    // Se hashea la contraseña para guardarla en la base de datos
    newUsuario.usuario_contrasenya = await argon2.hash(
      usuario.usuario_contrasenya,
      {
        type: argon2.argon2i,
        memoryCost: 8192,
        timeCost: 56,
        parallelism: 8,
        hashLength: 64,
        saltLength: 24,
      }
    );
    console.log("Post contraseña");

    let usuario_creado = await this.usuarioRepository.create(newUsuario);
    Object.keys(usuario_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + usuario_creado.usuario_id ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:usuario_creado [element],
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "crear"
    }));

    usuario_creado.usuario_contrasenya = "";
    return usuario_creado;
  }

  @get('/usuario/contar')
  @response(200, {
    description: 'Usuario model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    let returnable = await this.usuarioRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/usuario/ver/todos')
  @response(200, {
    description: 'Array of Usuario model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuario, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuario) filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    let returnable = await this.usuarioRepository.find({
      fields: [
        "usuario_id",
        "usuario_email",
        "usuario_rol_id",
        "usuario_medida_id"
      ]
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/usuario/actualizar/todos')
  @response(200, {
    description: 'Usuario PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Usuario,
    @param.where(Usuario) where?: Where<Usuario>,
  ): Promise<Count> {
    let returnable = await this.usuarioRepository.updateAll(usuario, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: usuario.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/usuario/ver/{id}')
  @response(200, {
    description: 'Usuario model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuario, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Usuario, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuario>
  ): Promise<Usuario> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "ver/id"
    }));
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/usuario/actualizar/{id}')
  @response(204, {
    description: 'Usuario PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['usuario_email', 'usuario_rol_id', 'usuario_id'],
            properties: {
              usuario_email: {
                type: 'string',
              },
              usuario_medida_id: {
                type: 'number',
              },
              usuario_rol_id: {
                type: 'number',
              },
              usuario_contrasenya: {
                type: 'string',
              },
            }
          }
        },
      },
    })
    usuario: Usuario,
  ): Promise<void | {
    "error": string,
    "message": string
  }> {
    let original = await this.usuarioRepository.findById(id);
    if (usuario.usuario_email != "") {
      original.usuario_email = usuario.usuario_email;
    }
    if (usuario.usuario_contrasenya != "") {
      if (usuario.usuario_contrasenya.length < 8) {

        return {"error": "error_contrasenya_invalid", message: "La contrasea debe tener 8 caracteres."};
      }
      original.usuario_contrasenya = await argon2.hash(
        usuario.usuario_contrasenya,
        {
          type: argon2.argon2i,
          memoryCost: 8192,
          timeCost: 56,
          parallelism: 8,
          hashLength: 64,
          saltLength: 24,
        }
      )
    }
    if (usuario.usuario_medida_id != undefined) {
      original.usuario_medida_id = usuario.usuario_medida_id;
    }
    if (usuario.usuario_rol_id != undefined) {
      original.usuario_rol_id = usuario.usuario_rol_id;
    }
    let updated = await this.usuarioRepository.updateById(id, original);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/usuario/remplazar/{id}')
  @response(204, {
    description: 'Usuario PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Usuario,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "/remplazar/id"
    }));
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/usuario/borrar/{id}')
  @response(204, {
    description: 'Usuario DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Usuario",
      acciones_tipo: "/borrar/id"
    }));
    await this.usuarioRepository.deleteById(id);
  }
}
