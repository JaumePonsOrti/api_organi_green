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
import {APPAuthenticationStrategy} from '../app-strategy';
import {BearerAuthenticationStrategy} from '../bearer-strategy';
import {AccionesRealizadas, Unidades_De_Medida} from '../models';
import {Unidades_De_MedidaRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class UnidadMedidaCrudController {
  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,
    @repository(Unidades_De_MedidaRepository)
    public usuarioRepository: Unidades_De_MedidaRepository,
    @inject('controllers.AccionesRealizadasCrudController') public acciones: AccionesRealizadasCrudController

  ) { }

  //____________________________ METODOS CAN ACTIVATE ______________________________
  @get("/unidad_medida/crear/can_activate")
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

  @get('/unidad_medida/contar/can_activate')
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

  @get('/unidad_medida/ver/todos/can_activate')
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

  @get('/unidad_medida/ver/{id}/can_activate')
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

  @get('/unidad_medida/actualizar/todos/can_activate')
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

  @get('/unidad_medida/actualizar/{id}/can_activate')
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

  @get('/unidad_medida/remplazar/{id}/can_activate')
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
  @get('/unidad_medida/borrar/{id}/can_activate')
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

  @post('/unidad_medida/crear')
  @response(200, {
    description: 'Unidades_De_Medida model instance',
    content: {'application/json': {schema: getModelSchemaRef(Unidades_De_Medida)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unidades_De_Medida, {
            title: 'NewUsuario',
            exclude: ['medida_id'],
          }),
        },
      },
    })
    usuario: Omit<Unidades_De_Medida, 'medida_id'>,
  ): Promise<Unidades_De_Medida> {
    let usuario_creado = await this.usuarioRepository.create(usuario);
    Object.keys(usuario_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + usuario_creado.medida_id ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:usuario_creado [element],
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "crear"
    }));

    return usuario_creado;
  }

  @get('/unidad_medida/contar')
  @response(200, {
    description: 'Unidades_De_Medida model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Unidades_De_Medida) where?: Where<Unidades_De_Medida>,
  ): Promise<Count> {
    let returnable = await this.usuarioRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/unidad_medida/ver/todos')
  @response(200, {
    description: 'Array of Unidades_De_Medida model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Unidades_De_Medida, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Unidades_De_Medida) filter?: Filter<Unidades_De_Medida>,
  ): Promise<Unidades_De_Medida[]> {
    let returnable = await this.usuarioRepository.find(filter);
    console.log("returnable: " + returnable)
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/unidad_medida/actualizar/todos')
  @response(200, {
    description: 'Unidades_De_Medida PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unidades_De_Medida, {partial: true}),
        },
      },
    })
    usuario: Unidades_De_Medida,
    @param.where(Unidades_De_Medida) where?: Where<Unidades_De_Medida>,
  ): Promise<Count> {
    let returnable = await this.usuarioRepository.updateAll(usuario, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: usuario.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/unidad_medida/ver/{id}')
  @response(200, {
    description: 'Unidades_De_Medida model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Unidades_De_Medida, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Unidades_De_Medida, {exclude: 'where'}) filter?: FilterExcludingWhere<Unidades_De_Medida>
  ): Promise<Unidades_De_Medida> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "ver/id"
    }));
    return this.usuarioRepository.findById(id, filter);
  }

  @patch('/unidad_medida/actualizar/{id}')
  @response(204, {
    description: 'Unidades_De_Medida PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Unidades_De_Medida, {partial: true}),
        },
      },
    })
    usuario: Unidades_De_Medida,
  ): Promise<void> {
    let original = await this.usuarioRepository.findById(id);
    let updated = await this.usuarioRepository.updateById(id, usuario);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/unidad_medida/remplazar/{id}')
  @response(204, {
    description: 'Unidades_De_Medida PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Unidades_De_Medida,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "/remplazar/id"
    }));
    await this.usuarioRepository.replaceById(id, usuario);
  }

  @del('/unidad_medida/borrar/{id}')
  @response(204, {
    description: 'Unidades_De_Medida DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Unidades_De_Medida",
      acciones_tipo: "/borrar/id"
    }));
    await this.usuarioRepository.deleteById(id);
  }
}
