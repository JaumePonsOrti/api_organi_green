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
import {AccionesRealizadas, Campo} from '../models';
import {CampoRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class CampoCrudController {
  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,
    @repository(CampoRepository)
    public campoRepository: CampoRepository,
    @inject('controllers.AccionesRealizadasCrudController') public acciones: AccionesRealizadasCrudController

  ) { }

  //____________________________ METODOS CAN ACTIVATE ______________________________
  @get("/campo/crear/can_activate")
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

  @get('/campo/contar/can_activate')
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

  @get('/campo/ver/todos/can_activate')
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

  @get('/campo/ver/{id}/can_activate')
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

  @get('/campo/actualizar/todos/can_activate')
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

  @get('/campo/actualizar/{id}/can_activate')
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

  @get('/campo/remplazar/{id}/can_activate')
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
  @get('/campo/borrar/{id}/can_activate')
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

  @post('/campo/crear')
  @response(200, {
    description: 'Campo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Campo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campo, {
            title: 'NewUsuario',
            exclude: ['campo_id'],
          }),
        },
      },
    })
    usuario: Omit<Campo, 'campo_id'>,
  ): Promise<Campo> {
    let campo_creado = await this.campoRepository.create(usuario);
    Object.keys(campo_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + campo_creado.campo_id ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:campo_creado [element],
      acciones_tabla_acción: "Campo",
      acciones_tipo: "crear"
    }));

    return campo_creado;
  }

  @get('/campo/contar')
  @response(200, {
    description: 'Campo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Campo) where?: Where<Campo>,
  ): Promise<Count> {
    let returnable = await this.campoRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/campo/ver/todos')
  @response(200, {
    description: 'Array of Campo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Campo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Campo) filter?: Filter<Campo>,
  ): Promise<Campo[]> {
    let returnable = await this.campoRepository.find(filter);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/campo/actualizar/todos')
  @response(200, {
    description: 'Campo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campo, {partial: true}),
        },
      },
    })
    usuario: Campo,
    @param.where(Campo) where?: Where<Campo>,
  ): Promise<Count> {
    let returnable = await this.campoRepository.updateAll(usuario, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: usuario.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/campo/ver/{id}')
  @response(200, {
    description: 'Campo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Campo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Campo, {exclude: 'where'}) filter?: FilterExcludingWhere<Campo>
  ): Promise<Campo> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "ver/id"
    }));
    return this.campoRepository.findById(id, filter);
  }

  @patch('/campo/actualizar/{id}')
  @response(204, {
    description: 'Campo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Campo, {partial: true}),
        },
      },
    })
    usuario: Campo,
  ): Promise<void> {
    let original = await this.campoRepository.findById(id);
    let updated = await this.campoRepository.updateById(id, usuario);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/campo/remplazar/{id}')
  @response(204, {
    description: 'Campo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Campo,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "/remplazar/id"
    }));
    await this.campoRepository.replaceById(id, usuario);
  }

  @del('/campo/borrar/{id}')
  @response(204, {
    description: 'Campo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Campo",
      acciones_tipo: "/borrar/id"
    }));
    await this.campoRepository.deleteById(id);
  }
}
