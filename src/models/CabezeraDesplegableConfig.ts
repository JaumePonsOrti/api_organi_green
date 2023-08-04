import {model, property} from '@loopback/repository';

@model()
export class CabezeraDesplegableConfig {
  @property()
  dato_mostrado: string;

  @property()
  nombre_campo?: string; // Opcional, ya que lo marcamos con '?'
}
