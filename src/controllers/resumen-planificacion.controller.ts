// Uncomment these imports to begin using these cool features!

import {inject} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  response
} from '@loopback/rest';
import {APPAuthenticationStrategy} from '../app-strategy';
import {BearerAuthenticationStrategy} from '../bearer-strategy';
import {AccionesRealizadas} from '../models';
import {SuperDesplegableConfig} from '../models/SuperDesplegableConfig';
import {CampoRepository, ClienteRepository, ParcelasRepository, PlanificacionRepository, ProductosPlanificadosRepository, ProductosRepository, Unidades_De_MedidaRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class ResumenPlanificacionController {

  constructor(
    @inject('authentication.strategies.app')
    public appAuthenticationStrategy: APPAuthenticationStrategy,
    @inject('authentication.strategies.bearer')
    public bearerAuthenticationStrategy: BearerAuthenticationStrategy,

    @repository(ParcelasRepository)
    public parcelasRepository: ParcelasRepository,
    @repository(PlanificacionRepository)
    public planificacionRepository: PlanificacionRepository,
    @repository(ProductosRepository)
    public productosRepository: ProductosRepository,
    @repository(ProductosPlanificadosRepository)
    public productosPlanificadosRepository: ProductosPlanificadosRepository,
    @repository(Unidades_De_MedidaRepository)
    public medidaRepository: Unidades_De_MedidaRepository,
    @repository(CampoRepository)
    public camposRepository: CampoRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,


    @inject('controllers.AccionesRealizadasCrudController') public acciones: AccionesRealizadasCrudController
  ) { }

  private listaPlanificaciones: any[] = [];
  private listaCampos: any[] = [];
  private listaClientes: any[] = [];
  private listaParcelas: any[] = [];
  private listaMedidas: any[] = [];
  private listaProductos: any[] = [];
  private listaProductosPlanificados: any[] = [];

  private objetoConParcelasOrdenadasPorCampo: any = {};
  private objetoConCamposPorId: any = {};
  private objetoConClientesPorId: any = {};
  private objetoConProductosPorId: any = {};
  private objetoConProductosPlanificacadosOrdenadosPorPlanificacion: any = {};
  private objetoConMedidasPorId: any = {}
  private objetoDosisPorProductoYDia: any = {};

  @get('/resumen-planificacion/ver/todos')
  @response(200, {
    description: 'Array of Parcelas model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SuperDesplegableConfig, {includeRelations: true}),
        },
      },
    },
  })
  async find(): Promise<SuperDesplegableConfig[]> {
    //Cargamos las planificaciones
    this.listaPlanificaciones = await this.planificacionRepository.find();

    this.listaCampos = await this.camposRepository.find();
    let nombreCampo = "campo_id";
    for (let i = 0; i < this.listaCampos.length; i++) {
      let elemento = this.listaCampos[i];
      if (typeof this.objetoConCamposPorId[elemento[nombreCampo]] === "undefined") {
        this.objetoConCamposPorId[elemento[nombreCampo]] = elemento;
      }
    }

    this.listaClientes = await this.clienteRepository.find();
    nombreCampo = "cliente_id";
    for (let i = 0; i < this.listaClientes.length; i++) {
      let elemento = this.listaClientes[i];
      if (typeof this.objetoConClientesPorId[elemento[nombreCampo]] === "undefined") {
        this.objetoConClientesPorId[elemento[nombreCampo]] = elemento;
      }
    };
    console.log("ObjetoConClientesPorId:", this.objetoConClientesPorId);

    this.listaParcelas = await this.parcelasRepository.find();


    for (let i = 0; i < this.listaParcelas.length; i++) {
      let parcela = this.listaParcelas[i];
      if (typeof this.objetoConParcelasOrdenadasPorCampo[parcela.parcelas_campo_id] === "undefined") {
        this.objetoConParcelasOrdenadasPorCampo[parcela.parcelas_campo_id] = [];
      }
      this.objetoConParcelasOrdenadasPorCampo[parcela.parcelas_campo_id].push(parcela);
    }

    this.listaProductos = await this.productosRepository.find();
    nombreCampo = "productos_id";
    for (let i = 0; i < this.listaProductos.length; i++) {
      let elemento = this.listaProductos[i];
      if (typeof this.objetoConProductosPorId[elemento[nombreCampo]] === "undefined") {
        this.objetoConProductosPorId[elemento[nombreCampo]] = elemento;
      }
    }

    this.listaMedidas = await this.medidaRepository.find();
    nombreCampo = "medida_id";
    for (let i = 0; i < this.listaMedidas.length; i++) {
      let elemento = this.listaMedidas[i];
      if (typeof this.objetoConMedidasPorId[elemento[nombreCampo]] === "undefined") {
        this.objetoConMedidasPorId[elemento[nombreCampo]] = elemento;
      }
    }

    this.listaProductosPlanificados = await this.productosPlanificadosRepository.find();
    nombreCampo = "productos_planificados_id_planificacion";
    for (let i = 0; i < this.listaProductosPlanificados.length; i++) {
      let elemento = this.listaProductosPlanificados[i];
      //Comprobaremos si el producto planificado lo trae el cliente o no
      if (elemento["productos_planificados_producto_dueño"] == 0) {
        if (typeof this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]] === "undefined") {
          this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]] = [];
        }
        this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]].push(elemento);
      }

    }

    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Parcelas",
      acciones_tipo: "ver/todos"
    }));


    let objetoTamanyoTotalPorDia: any = {};
    //Recorremos las planificaciones para obtener una lista con los productos usados en un dia
    this.objetoDosisPorProductoYDia = {};

    /*
    *Dentro de la variable objetoProductosPorDia  por cada indice (fecha)
    se guarda un objeto cuyo indice es el id del producto
    */
    let objetoProductosPorDia: any = {};
    let listaIndiceFechas: string[] = [];
    let objetoListaIndicesPorProductoYDia: any = {};

    for (let index = 0; index < this.listaPlanificaciones.length; index++) {
      const planificacion = this.listaPlanificaciones[index];
      console.log("Planificacion:", planificacion);

      let fecha = new Date(planificacion["planificacion_fecha_realizar"]).toJSON();
      if (typeof this.objetoDosisPorProductoYDia[fecha] === "undefined") {
        this.objetoDosisPorProductoYDia[fecha] = [];
        listaIndiceFechas.push(fecha);
        objetoProductosPorDia[fecha] = {};
        objetoListaIndicesPorProductoYDia[fecha] = [];
      }

      let listaParcelasCampo = this.objetoConParcelasOrdenadasPorCampo[planificacion["planificacion_id_campo"]] ?? [];
      console.log("Objeto:", this.objetoConParcelasOrdenadasPorCampo);

      //Calcular tamaño campo
      let tamnayo_campo = 0;
      for (var i = 0; i < listaParcelasCampo.length; i++) {
        let parcela = listaParcelasCampo[i];
        tamnayo_campo = tamnayo_campo + parcela.tamanyo_m2;
      }


      let listaProductosPlanificadosI = this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[planificacion["planificacion_id"]] ?? [];

      //FOR PARA CREAR LOS OBJETOS DE PRODUCTOS a mostrar y facilitar el hacer calculos
      for (let index2 = 0; index2 < listaProductosPlanificadosI.length; index2++) {
        console.log("ENTRO EN FOR PRODUCTOS, index2:", index2);

        let productoPlan = listaProductosPlanificadosI[index2];
        let producto = this.objetoConProductosPorId[productoPlan["productos_planificados_id_producto"]];
        let dosis = producto["productos_cantidad_referenciada"];
        let unidad_medida_en_metros_cuadrados = this.objetoConMedidasPorId[producto["productos_medida_id"]]["medida_metros_cuadrados"];
        let dosis_por_producto_campo = tamnayo_campo * (dosis / unidad_medida_en_metros_cuadrados);

        let productoId = producto["productos_id"];
        if (typeof objetoProductosPorDia[fecha][productoId] === "undefined") {

          let objeto = {
            productos_id: productoId,
            productos_nombre: producto["productos_nombre"],
            dosis_por_producto_dia: dosis_por_producto_campo
          };
          objetoProductosPorDia[fecha][producto["productos_id"]] = objeto;

          objetoListaIndicesPorProductoYDia[fecha].push(producto["productos_id"]);

        } else {
          let dosis_por_producto_dia = objetoProductosPorDia[fecha][productoId]["dosis_por_producto_dia"] + dosis_por_producto_campo;
          objetoProductosPorDia[fecha][productoId]["dosis_por_producto_dia"] = dosis_por_producto_dia;
        }


      }
      console.log("Objeto Productos:", objetoProductosPorDia);

    }

    console.log("Lista Indices Fechas:", listaIndiceFechas);

    //Bucle  para calcular la cantidad por producto y dia
    for (let index = 0; index < listaIndiceFechas.length; index++) {
      const fecha = listaIndiceFechas[index];
      console.log("Fecha:", fecha);

      console.log("objetoListaIndicesPorProductoYDia por fecha:", objetoListaIndicesPorProductoYDia[fecha]);
      for (let index2 = 0; index2 < objetoListaIndicesPorProductoYDia[fecha].length; index2++) {
        console.log("Producto");
        try {
          let productoId = objetoListaIndicesPorProductoYDia[fecha][index2];
          let producto = objetoProductosPorDia[fecha][productoId];


          this.objetoDosisPorProductoYDia[fecha].push(producto);
        } catch (error) {
          console.log("500 error:", error);
        }

      }
      console.log("Objeto Por dosis:", this.objetoDosisPorProductoYDia);
      //Calcular tamaño campo

    }
    let returnable = this.objetoDosisPorProductoYDia


    return returnable;

  }
}
