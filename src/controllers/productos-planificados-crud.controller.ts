
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
import {AccionesRealizadas, ProductosPlanificados} from '../models';
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
  @get("/productos-planificados/crear/can_activate")
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

  @get('/productos-planificados/contar/can_activate')
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

  @get('/productos-planificados/ver/todos/can_activate')
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

  @get('/productos-planificados/ver/{id}/can_activate')
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

  @get('/productos-planificados/actualizar/todos/can_activate')
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

  @get('/productos-planificados/actualizar/{id}/can_activate')
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

  @get('/productos-planificados/remplazar/{id}/can_activate')
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
  @get('/productos-planificados/borrar/{id}/can_activate')
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

  @post('/productos-planificados/crear')
  @response(200, {
    description: 'ProductosPlanificados model instance',
    content: {'application/json': {schema: getModelSchemaRef(ProductosPlanificados)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosPlanificados, {
            title: 'NewProductosPlanificados',
            exclude: ['product_plan_id'],
          }),
        },
      },
    })
    productos_planificados: Omit<ProductosPlanificados, 'product_plan_id'>,
  ): Promise<ProductosPlanificados> {
    let productos_planificados_creado = await this.productos_planificadosRepository.create(productos_planificados);
    Object.keys(productos_planificados_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + productos_planificados_creado.product_plan_id_producto ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:productos_planificados_creado [element],
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "crear"
    }));

    return productos_planificados_creado;
  }

  @get('/productos-planificados/contar')
  @response(200, {
    description: 'ProductosPlanificados model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ProductosPlanificados) where?: Where<ProductosPlanificados>,
  ): Promise<Count> {
    let returnable = await this.productos_planificadosRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/productos-planificados/ver/todos')
  @response(200, {
    description: 'Array of ProductosPlanificados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ProductosPlanificados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ProductosPlanificados) filter?: Filter<ProductosPlanificados>,
  ): Promise<ProductosPlanificados[]> {
    let returnable = await this.productos_planificadosRepository.find(filter);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/productos-planificados/actualizar/todos')
  @response(200, {
    description: 'ProductosPlanificados PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosPlanificados, {partial: true}),
        },
      },
    })
    productos_planificados: ProductosPlanificados,
    @param.where(ProductosPlanificados) where?: Where<ProductosPlanificados>,
  ): Promise<Count> {
    let returnable = await this.productos_planificadosRepository.updateAll(productos_planificados, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: productos_planificados.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/productos-planificados/ver/{id}')
  @response(200, {
    description: 'ProductosPlanificados model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ProductosPlanificados, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ProductosPlanificados, {exclude: 'where'}) filter?: FilterExcludingWhere<ProductosPlanificados>
  ): Promise<ProductosPlanificados> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "ver/id"
    }));
    return this.productos_planificadosRepository.findById(id, filter);
  }

  @patch('/productos-planificados/actualizar/{id}')
  @response(204, {
    description: 'ProductosPlanificados PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProductosPlanificados, {partial: true}),
        },
      },
    })
    productos_planificados: ProductosPlanificados,
  ): Promise<void> {
    let original = await this.productos_planificadosRepository.findById(id);
    let updated = await this.productos_planificadosRepository.updateById(id, productos_planificados);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/productos-planificados/remplazar/{id}')
  @response(204, {
    description: 'ProductosPlanificados PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() productos_planificados: ProductosPlanificados,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "/remplazar/id"
    }));
    await this.productos_planificadosRepository.replaceById(id, productos_planificados);
  }

  @del('/productos-planificados/borrar/{id}')
  @response(204, {
    description: 'ProductosPlanificados DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "ProductosPlanificados",
      acciones_tipo: "/borrar/id"
    }));
    await this.productos_planificadosRepository.deleteById(id);
  }
}
