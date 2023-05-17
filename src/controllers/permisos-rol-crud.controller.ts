

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
import {AccionesRealizadas, Permisos_Rol} from '../models';
import {PermisosRolRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class PermisosRolCrudController {
  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,
    @repository(PermisosRolRepository)
    public permisos_rolRepository: PermisosRolRepository,
    @inject('controllers.AccionesRealizadasCrudController') public acciones: AccionesRealizadasCrudController

  ) { }

  //____________________________ METODOS CAN ACTIVATE ______________________________
  @get("/permisos-rol/crear/can_activate")
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

  @get('/permisos-rol/contar/can_activate')
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

  @get('/permisos-rol/ver/todos/can_activate')
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

  @get('/permisos-rol/ver/{id}/can_activate')
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

  @get('/permisos-rol/actualizar/todos/can_activate')
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

  @get('/permisos-rol/actualizar/{id}/can_activate')
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

  @get('/permisos-rol/remplazar/{id}/can_activate')
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
  @get('/permisos-rol/borrar/{id}/can_activate')
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

  @post('/permisos-rol/crear')
  @response(200, {
    description: 'Permisos_Rol model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permisos_Rol)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos_Rol, {
            title: 'NewUsuario',
            exclude: ['permisos_rol_id'],
          }),
        },
      },
    })
    usuario: Omit<Permisos_Rol, 'permisos_rol_id'>,
  ): Promise<Permisos_Rol> {
    let permisos_rol_creado = await this.permisos_rolRepository.create(usuario);
    Object.keys(permisos_rol_creado).forEach(async element => {
      //Mover acciones create aquí dentro
    });
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + permisos_rol_creado.permisos_rol_id ?? "No asignado",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo:permisos_rol_creado [element],
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "crear"
    }));

    return permisos_rol_creado;
  }

  @get('/permisos-rol/contar')
  @response(200, {
    description: 'Permisos_Rol model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permisos_Rol) where?: Where<Permisos_Rol>,
  ): Promise<Count> {
    let returnable = await this.permisos_rolRepository.count(where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      acciones_id_tabla: "TODOS",
      acciones_valor_nuevo: "" + returnable.count,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "contar"
    }));
    return returnable;
  }

  @get('/permisos-rol/ver/todos')
  @response(200, {
    description: 'Array of Permisos_Rol model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permisos_Rol, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permisos_Rol) filter?: Filter<Permisos_Rol>,
  ): Promise<Permisos_Rol[]> {
    let returnable = await this.permisos_rolRepository.find(filter);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "ver/todos"
    }));
    return returnable;
  }

  @patch('/permisos-rol/actualizar/todos')
  @response(200, {
    description: 'Permisos_Rol PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos_Rol, {partial: true}),
        },
      },
    })
    usuario: Permisos_Rol,
    @param.where(Permisos_Rol) where?: Where<Permisos_Rol>,
  ): Promise<Count> {
    let returnable = await this.permisos_rolRepository.updateAll(usuario, where);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      // acciones_id_tabla: usuario.getId(),
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "actualizar/todos"
    }));
    return returnable;
  }

  @get('/permisos-rol/ver/{id}')
  @response(200, {
    description: 'Permisos_Rol model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permisos_Rol, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Permisos_Rol, {exclude: 'where'}) filter?: FilterExcludingWhere<Permisos_Rol>
  ): Promise<Permisos_Rol> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "ver/id"
    }));
    return this.permisos_rolRepository.findById(id, filter);
  }

  @patch('/permisos-rol/actualizar/{id}')
  @response(204, {
    description: 'Permisos_Rol PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos_Rol, {partial: true}),
        },
      },
    })
    usuario: Permisos_Rol,
  ): Promise<void> {
    let original = await this.permisos_rolRepository.findById(id);
    let updated = await this.permisos_rolRepository.updateById(id, usuario);
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      // acciones_valor_nuevo: ori,
      //acciones_valor_antiguo: ,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "actualizar/id"
    }));

  }

  @put('/permisos-rol/remplazar/{id}')
  @response(204, {
    description: 'Permisos_Rol PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() usuario: Permisos_Rol,
  ): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "/remplazar/id"
    }));
    await this.permisos_rolRepository.replaceById(id, usuario);
  }

  @del('/permisos-rol/borrar/{id}')
  @response(204, {
    description: 'Permisos_Rol DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "" + id,
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Permisos_Rol",
      acciones_tipo: "/borrar/id"
    }));
    await this.permisos_rolRepository.deleteById(id);
  }
}
