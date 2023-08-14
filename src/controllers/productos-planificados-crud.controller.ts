
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
import {AccionesRealizadas, Productos_Planificados} from '../models';
import {ProductosPlanificadosRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class ProductosPlanificadosCrudController {
  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,
    @repository(ProductosPlanificadosRepository)
    public productos_planificadosRepository: ProductosPlanificadosRepository,
    @inject('controllers.AccionesRealizadasCrudController') public acciones: AccionesRealizadasCrudController

  ) { }

  //____________________________ METODOS CAN ACTIVATE ______________________________
  @get("/productos_planificados/crear/can_activate")
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

  @get('/productos_planificados/contar/can_activate')
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

  @get('/productos_planificados/ver/todos/can_activate')
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

  @get('/productos_planificados/ver/{id}/can_activate')
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

  @get('/productos_planificados/actualizar/todos/can_activate')
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

  @get('/productos_planificados/actualizar/{id}/can_activate')
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

  @get('/productos_planificados/remplazar/{id}/can_activate')
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
  @get('/productos_planificados/borrar/{id}/can_activate')
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

  @post('/productos_planificados/crear')
  @response(200, {
    description: 'ProductosPlanificados model instance',
    content: {'application/json': {schema: getModelSchemaRef(Productos_Planificados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',

            required: [],
            properties: {
              productos_planificados_id: {
                type: 'number',
              },
              productos_planificados_id_producto: {
                type: 'number',
              },
              productos_planificados_id_planificacion: {
                type: 'number',

              },
              productos_planificados_numero_de_lote: {
                type: 'string',
              },
              productos_planificados_producto_dueño: {
                type: 'number',
                default: 0
              },
            },
          },
        },
      },
    })
    productos_planificados: Omit<Productos_Planificados, 'product_plan_id'>,
  ): Promise<Productos_Planificados> {
    let productos_planificados_creado = await this.productos_planificadosRepository.create(productos_planificados);
    Object.keys(productos_planificados_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + productos_planificados_creado.productos_planificados_id_producto ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:productos_planificados_creado [element],
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "crear"
    }));

    return productos_planificados_creado;
  }

  @get('/productos_planificados/contar')
  @response(200, {
    description: 'Productos_Planificados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Productos_Planificados) where?: Where<Productos_Planificados>,
  ): Promise<Count> {
    let returnable = await this.productos_planificadosRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/productos_planificados/ver/todos')
  @response(200, {
    description: 'Array of Productos_Planificados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Productos_Planificados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Productos_Planificados) filter?: Filter<Productos_Planificados>,
  ): Promise<Productos_Planificados[]> {
    let returnable = await this.productos_planificadosRepository.find(filter);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/productos_planificados/actualizar/todos')
  @response(200, {
    description: 'Productos_Planificados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos_Planificados, {partial: true}),
        },
      },
    })
    productos_planificados: Productos_Planificados,
    @param.where(Productos_Planificados) where?: Where<Productos_Planificados>,
  ): Promise<Count> {
    let returnable = await this.productos_planificadosRepository.updateAll(productos_planificados, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: productos_planificados.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/productos_planificados/ver/{id}')
  @response(200, {
    description: 'Productos_Planificados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Productos_Planificados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Productos_Planificados, {exclude: 'where'}) filter?: FilterExcludingWhere<Productos_Planificados>
  ): Promise<Productos_Planificados> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "ver/id"
    }));
    return this.productos_planificadosRepository.findById(id, filter);
  }

  @patch('/productos_planificados/actualizar/{id}')
  @response(204, {
    description: 'Productos_Planificados PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Productos_Planificados, {partial: true}),
        },
      },
    })
    productos_planificados: Productos_Planificados,
  ): Promise<void> {
    let original = await this.productos_planificadosRepository.findById(id);
    let updated = await this.productos_planificadosRepository.updateById(id, productos_planificados);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/productos_planificados/remplazar/{id}')
  @response(204, {
    description: 'Productos_Planificados PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productos_planificados: Productos_Planificados,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "/remplazar/id"
    }));
    await this.productos_planificadosRepository.replaceById(id, productos_planificados);
  }

  @del('/productos_planificados/borrar/{id}')
  @response(204, {
    description: 'Productos_Planificados DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Productos_Planificados",
      acciones_tipo: "/borrar/id"
    }));
    await this.productos_planificadosRepository.deleteById(id);
  }
}
