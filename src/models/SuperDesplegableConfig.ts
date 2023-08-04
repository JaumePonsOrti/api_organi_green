import {model, property} from '@loopback/repository';
import {CabezeraDesplegableConfig} from './CabezeraDesplegableConfig';
import {ICabezeraDesplegableConfig, ISuperDesplegableComponenteInternoConfig, ISuperDesplegableConfig, ISuperTableDesplegableConfig} from './models/IDesplegableConfig'; // Reemplaza 'your-file' con el nombre del archivo donde se encuentran las interfaces

@model()
export class SuperDesplegableConfig {
  @property.array(CabezeraDesplegableConfig)
  headersDesplegable: ICabezeraDesplegableConfig[];

  @property()
  componente_interno: ISuperDesplegableComponenteInternoConfig;

  @property()
  collapsed: boolean;
}

@model()
export class SuperDesplegableComponenteInternoConfig {
  @property()
  type: string;

  @property()
  config_table: ISuperTableDesplegableConfig;

  @property()
  config_desplegable: ISuperDesplegableConfig[]

}

