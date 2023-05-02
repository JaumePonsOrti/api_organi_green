import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {Permisos_De_Rol_App} from '../models';
import {PermisosDeRolAppRepository} from '../repositories';

export class PermisosAppController {
  constructor(
    @repository(PermisosDeRolAppRepository)
    public permisosDeRolAppRepository: PermisosDeRolAppRepository,
  ) { }

  @post('/permisos_app')
  @response(200, {
    description: 'PermisosDeRolApp model instance',
    content: {'application/json': {schema: getModelSchemaRef(Permisos_De_Rol_App)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos_De_Rol_App, {
            title: 'NewPermisosDeRolApp',
            exclude: ['permisos_de_rol_app_id'],
          }),
        },
      },
    })
    permisosDeRolApp: Omit<Permisos_De_Rol_App, 'permisos_de_rol_app_id'>,
  ): Promise<Permisos_De_Rol_App> {
    return this.permisosDeRolAppRepository.create(permisosDeRolApp);
  }

  @get('/permisos_app/count')
  @response(200, {
    description: 'PermisosDeRolApp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Permisos_De_Rol_App) where?: Where<Permisos_De_Rol_App>,
  ): Promise<Count> {
    return this.permisosDeRolAppRepository.count(where);
  }

  @get('/permisos_app')
  @response(200, {
    description: 'Array of PermisosDeRolApp model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Permisos_De_Rol_App, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Permisos_De_Rol_App) filter?: Filter<Permisos_De_Rol_App>,
  ): Promise<Permisos_De_Rol_App[]> {
    return this.permisosDeRolAppRepository.find(filter);
  }

  @patch('/permisos_app')
  @response(200, {
    description: 'PermisosDeRolApp PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos_De_Rol_App, {partial: true}),
        },
      },
    })
    permisosDeRolApp: Permisos_De_Rol_App,
    @param.where(Permisos_De_Rol_App) where?: Where<Permisos_De_Rol_App>,
  ): Promise<Count> {
    return this.permisosDeRolAppRepository.updateAll(permisosDeRolApp, where);
  }

  @get('/permisos_app/{id}')
  @response(200, {
    description: 'PermisosDeRolApp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Permisos_De_Rol_App, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Permisos_De_Rol_App, {exclude: 'where'}) filter?: FilterExcludingWhere<Permisos_De_Rol_App>
  ): Promise<Permisos_De_Rol_App> {
    return this.permisosDeRolAppRepository.findById(id, filter);
  }

  @patch('/permisos_app/{id}')
  @response(204, {
    description: 'PermisosDeRolApp PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos_De_Rol_App, {partial: true}),
        },
      },
    })
    permisosDeRolApp: Permisos_De_Rol_App,
  ): Promise<void> {
    await this.permisosDeRolAppRepository.updateById(id, permisosDeRolApp);
  }

  @put('/permisos_app/{id}')
  @response(204, {
    description: 'PermisosDeRolApp PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permisosDeRolApp: Permisos_De_Rol_App,
  ): Promise<void> {
    await this.permisosDeRolAppRepository.replaceById(id, permisosDeRolApp);
  }

  @del('/permisos_app/{id}')
  @response(204, {
    description: 'PermisosDeRolApp DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.permisosDeRolAppRepository.deleteById(id);
  }
}
