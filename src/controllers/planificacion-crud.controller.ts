
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
import {AccionesRealizadas, Planificacion} from '../models';
import {PlanificacionRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class PlanificacionCrudController {
  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,
    @repository(PlanificacionRepository)
    public planificacionRepository: PlanificacionRepository,
    @inject('controllers.AccionesRealizadasCrudController')
    public acciones: AccionesRealizadasCrudController

  ) { }

  //____________________________ METODOS CAN ACTIVATE ______________________________
  @get("/planificacion/crear/can_activate")
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

  @get('/planificacion/contar/can_activate')
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

  @get('/planificacion/ver/todos/can_activate')
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

  @get('/planificacion/ver/{id}/can_activate')
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

  @get('/planificacion/actualizar/todos/can_activate')
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

  @get('/planificacion/actualizar/{id}/can_activate')
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

  @get('/planificacion/remplazar/{id}/can_activate')
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
  @get('/planificacion/borrar/{id}/can_activate')
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

  @post('/planificacion/crear')
  @response(200, {
    description: 'Planificacion model instance',
    content: {'application/json': {schema: getModelSchemaRef(Planificacion)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['planificacion_id_campo'],
            properties: {
              planificacion_id: {
                type: 'number',
              },
              planificacion_id_campo: {
                type: 'number',
              },
              planificacion_fecha_realizar: {
                type: 'string',
              },
              planificacion_estado: {
                type: 'number',
                default: 0
              },
            },
          },
        },
      },
    })
    planificacion: Omit<{
      planificacion_id: number,
      planificacion_id_campo: number,
      planificacion_fecha_realizar: string,
      planificacion_estado?: number,
    }, 'planificacion_id'>,
  ): Promise<Planificacion> {
    console.log('ENTRO EN CREAR PLANIFICACIÓN');
    let usuario_creado = await this.planificacionRepository.create(planificacion);
    Object.keys(usuario_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + usuario_creado.planificacion_id ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:usuario_creado [element],
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "crear"
    }));

    return usuario_creado;
  }

  @get('/planificacion/contar')
  @response(200, {
    description: 'Planificacion model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Planificacion) where?: Where<Planificacion>,
  ): Promise<Count> {
    let returnable = await this.planificacionRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/planificacion/ver/todos')
  @response(200, {
    description: 'Array of Planificacion model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Planificacion, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Planificacion) filter?: Filter<Planificacion>,
  ): Promise<Planificacion[]> {
    let returnable = await this.planificacionRepository.find(filter);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/planificacion/actualizar/todos')
  @response(200, {
    description: 'Planificacion PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planificacion, {partial: true}),
        },
      },
    })
    usuario: Planificacion,
    @param.where(Planificacion) where?: Where<Planificacion>,
  ): Promise<Count> {
    let returnable = await this.planificacionRepository.updateAll(usuario, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: usuario.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/planificacion/ver/{id}')
  @response(200, {
    description: 'Planificacion model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Planificacion, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Planificacion, {exclude: 'where'}) filter?: FilterExcludingWhere<Planificacion>
  ): Promise<Planificacion> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "ver/id"
    }));
    return this.planificacionRepository.findById(id, filter);
  }

  @patch('/planificacion/actualizar/{id}')
  @response(204, {
    description: 'Planificacion PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Planificacion, {partial: true}),
        },
      },
    })
    usuario: Planificacion,
  ): Promise<void> {
    let original = await this.planificacionRepository.findById(id);
    let updated = await this.planificacionRepository.updateById(id, usuario);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/planificacion/remplazar/{id}')
  @response(204, {
    description: 'Planificacion PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Planificacion,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "/remplazar/id"
    }));
    await this.planificacionRepository.replaceById(id, usuario);
  }

  @del('/planificacion/borrar/{id}')
  @response(204, {
    description: 'Planificacion DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Planificacion",
      acciones_tipo: "/borrar/id"
    }));
    await this.planificacionRepository.deleteById(id);
  }
}
