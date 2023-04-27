import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PermisosDeRolApp} from '../models';
import {PermisosDeRolAppRepository} from '../repositories';

export class PermisosAppController {
  constructor(
    @repository(PermisosDeRolAppRepository)
    public permisosDeRolAppRepository : PermisosDeRolAppRepository,
  ) {}

  @post('/permisos_app')
  @response(200, {
    description: 'PermisosDeRolApp model instance',
    content: {'application/json': {schema: getModelSchemaRef(PermisosDeRolApp)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PermisosDeRolApp, {
            title: 'NewPermisosDeRolApp',
            exclude: ['permisos_de_rol_app_id'],
          }),
        },
      },
    })
    permisosDeRolApp: Omit<PermisosDeRolApp, 'permisos_de_rol_app_id'>,
  ): Promise<PermisosDeRolApp> {
    return this.permisosDeRolAppRepository.create(permisosDeRolApp);
  }

  @get('/permisos_app/count')
  @response(200, {
    description: 'PermisosDeRolApp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PermisosDeRolApp) where?: Where<PermisosDeRolApp>,
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
          items: getModelSchemaRef(PermisosDeRolApp, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PermisosDeRolApp) filter?: Filter<PermisosDeRolApp>,
  ): Promise<PermisosDeRolApp[]> {
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
          schema: getModelSchemaRef(PermisosDeRolApp, {partial: true}),
        },
      },
    })
    permisosDeRolApp: PermisosDeRolApp,
    @param.where(PermisosDeRolApp) where?: Where<PermisosDeRolApp>,
  ): Promise<Count> {
    return this.permisosDeRolAppRepository.updateAll(permisosDeRolApp, where);
  }

  @get('/permisos_app/{id}')
  @response(200, {
    description: 'PermisosDeRolApp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PermisosDeRolApp, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PermisosDeRolApp, {exclude: 'where'}) filter?: FilterExcludingWhere<PermisosDeRolApp>
  ): Promise<PermisosDeRolApp> {
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
          schema: getModelSchemaRef(PermisosDeRolApp, {partial: true}),
        },
      },
    })
    permisosDeRolApp: PermisosDeRolApp,
  ): Promise<void> {
    await this.permisosDeRolAppRepository.updateById(id, permisosDeRolApp);
  }

  @put('/permisos_app/{id}')
  @response(204, {
    description: 'PermisosDeRolApp PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() permisosDeRolApp: PermisosDeRolApp,
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
