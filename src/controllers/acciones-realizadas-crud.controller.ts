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
import {AccionesRealizadas} from '../models';
import {AccionesRealizadasRepository} from '../repositories/acciones-realizadas.repository';


export class AccionesRealizadasCrudController {
  constructor(
    @repository(AccionesRealizadasRepository)
    public accionesRealizadasRepository: AccionesRealizadasRepository,
  ) { }


  @post('/acciones-realizadas/crear')
  @response(200, {
    description: 'AccionesRealizadas model instance',
    content: {'application/json': {schema: getModelSchemaRef(AccionesRealizadas)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccionesRealizadas, {
            title: 'NewUsuario',
            exclude: ['acciones_id'],
          }),
        },
      },
    })
    acciones_realizadas: Omit<AccionesRealizadas, 'acciones_id'>,
  ): Promise<AccionesRealizadas> {
    return this.accionesRealizadasRepository.create(acciones_realizadas);
  }

  @get('/acciones-realizadas/count')
  @response(200, {
    description: 'AccionesRealizadas model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AccionesRealizadas) where?: Where<AccionesRealizadas>,
  ): Promise<Count> {
    return this.accionesRealizadasRepository.count(where);
  }

  @get('/acciones-realizadas/ver/todos')
  @response(200, {
    description: 'Array of AccionesRealizadas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AccionesRealizadas, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AccionesRealizadas) filter?: Filter<AccionesRealizadas>,
  ): Promise<AccionesRealizadas[]> {
    return this.accionesRealizadasRepository.find(filter);
  }

  @patch('/acciones-realizadas/actualizar/todos')
  @response(200, {
    description: 'AccionesRealizadas PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccionesRealizadas, {partial: true}),
        },
      },
    })
    acciones_realizadas: AccionesRealizadas,
    @param.where(AccionesRealizadas) where?: Where<AccionesRealizadas>,
  ): Promise<Count> {
    return this.accionesRealizadasRepository.updateAll(acciones_realizadas, where);
  }

  @get('/acciones-realizadas/ver/{id}')
  @response(200, {
    description: 'AccionesRealizadas model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AccionesRealizadas, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AccionesRealizadas, {exclude: 'where'}) filter?: FilterExcludingWhere<AccionesRealizadas>
  ): Promise<AccionesRealizadas> {
    return this.accionesRealizadasRepository.findById(id, filter);
  }

  @patch('/acciones-realizadas/actualizar/{id}')
  @response(204, {
    description: 'AccionesRealizadas PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccionesRealizadas, {partial: true}),
        },
      },
    })
    acciones_realizadas: AccionesRealizadas,
  ): Promise<void> {
    await this.accionesRealizadasRepository.updateById(id, acciones_realizadas);
  }

  @put('/acciones-realizadas/remplazar/{id}')
  @response(204, {
    description: 'AccionesRealizadas PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() acciones_realizadas: AccionesRealizadas,
  ): Promise<void> {
    await this.accionesRealizadasRepository.replaceById(id, acciones_realizadas);
  }

  @del('/acciones-realizadas/borrar/{id}')
  @response(204, {
    description: 'AccionesRealizadas DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.accionesRealizadasRepository.deleteById(id);
  }
}
