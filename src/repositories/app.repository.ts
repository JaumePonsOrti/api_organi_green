import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {App, AppRelations} from '../models';

export class AppRepository extends DefaultCrudRepository<
  App,
  typeof App.prototype.app_id,
  AppRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(App, dataSource);
  }
}
