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
import {ICabezeraDesplegableConfig} from '../models/models/IDesplegableConfig';
import {CampoRepository, ClienteRepository, ParcelasRepository, PlanificacionRepository, ProductosPlanificadosRepository, ProductosRepository, Unidades_De_MedidaRepository} from '../repositories';
import {AccionesRealizadasCrudController} from './acciones-realizadas-crud.controller';

export class VerPlanificacionController {

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
  private objetoDosisDeCadaCampoPorProducto: any = {};

  @get('/ver_planificacion/ver/todos')
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
      if (typeof this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]] === "undefined") {
        this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]] = [];
      }
      this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[elemento[nombreCampo]].push(elemento);
    }

    await this.acciones.create(new AccionesRealizadas({
      acciones_id_app: APPAuthenticationStrategy.CURRENT_APP.app_id,
      acciones_id_tabla: "TODOS",
      acciones_id_usuario_realiza: BearerAuthenticationStrategy.CURRENT_USER.usuario_id,
      //acciones_valor_nuevo: element,
      acciones_tabla_acción: "Parcelas",
      acciones_tipo: "ver/todos"
    }));

    let returnable: SuperDesplegableConfig[] = [];
    for (let index = 0; index < this.listaPlanificaciones.length; index++) {
      this.objetoDosisDeCadaCampoPorProducto = {};
      let objetoConfig!: SuperDesplegableConfig;
      const planificacion = this.listaPlanificaciones[index];
      console.log("Planificacion:", planificacion);
      let listaParcelasCampo = this.objetoConParcelasOrdenadasPorCampo[planificacion["planificacion_id_campo"]] ?? [];
      console.log("Objeto:", this.objetoConParcelasOrdenadasPorCampo)

      let campo = this.objetoConCamposPorId[planificacion["planificacion_id_campo"]];
      console.log("Campo:", campo);

      let cliente = this.objetoConClientesPorId[campo["campo_cliente_id"]];
      let cabeceraDesplegableCampo: ICabezeraDesplegableConfig[] = [
        {
          nombre_campo: "Nombre Cliente",
          dato_mostrado: cliente["cliente_nombre"]
        },
        {
          nombre_campo: "Nombre del campo",
          dato_mostrado: campo["campo_nombre"]
        },
        {
          nombre_campo: "Tamaño de facturacion",
          dato_mostrado: campo["campo_tamanyo_facturacion"]
        }
      ];

      let tamnayo_campo = 0;
      //Calcular tamaño campo
      for (var i = 0; i < listaParcelasCampo.length; i++) {
        let parcela = listaParcelasCampo[i];
        tamnayo_campo = tamnayo_campo + parcela.tamanyo_m2;
      }

      let listaSuperDesplegableConfigParcela: SuperDesplegableConfig[] = [];
      for (let j = 0; j < listaParcelasCampo.length; j++) {
        let parcela = listaParcelasCampo[j];
        let cabeceraDesplegableParcela: ICabezeraDesplegableConfig[] = [
          {
            nombre_campo: "Numero Poligono",
            dato_mostrado: parcela.parcelas_poligono
          },
          {
            nombre_campo: "Numero Parcela",
            dato_mostrado: parcela.parcelas_parcela
          },
          {
            nombre_campo: "Numero/Codigo Provincia",
            dato_mostrado: parcela.parcelas_provincia
          },
          {
            nombre_campo: "Numero/Codigo municipio",
            dato_mostrado: parcela.parcelas_municipio
          }
        ];
        let listaProductosPlanificadosI = this.objetoConProductosPlanificacadosOrdenadosPorPlanificacion[planificacion["planificacion_id"]];

        let listaProductosAImprimirEnTabla: any[] = [];
        //FOR PARA CREAR LOS OBJETOS DE PRODUCTOS a mostrar, calcular dosis
        for (let index2 = 0; index2 < listaProductosPlanificadosI.length; index2++) {
          console.log("ENTRO EN FOR PRODUCTOS, index2:", index2);
          let productoPlan = listaProductosPlanificadosI[index2];
          let producto = this.objetoConProductosPorId[productoPlan["productos_planificados_id_producto"]]

          let dosis = producto["productos_cantidad_referenciada"];
          let unidad_medida_en_metros_cuadrados = this.objetoConMedidasPorId[producto["productos_medida_id"]]["medida_metros_cuadrados"];
          let dosis_por_parcela = parcela["tamanyo_m2"] * (dosis / unidad_medida_en_metros_cuadrados);

          if (typeof this.objetoDosisDeCadaCampoPorProducto[producto["productos_id"]] === "undefined") {
            this.objetoDosisDeCadaCampoPorProducto[producto["productos_id"]] = 0;
          }
          let dosis_por_campo = tamnayo_campo * (dosis / unidad_medida_en_metros_cuadrados);
          this.objetoDosisDeCadaCampoPorProducto[producto["productos_id"]] =
            dosis_por_campo;

          let objeto: any = {
            producto_id: producto["productos_id"],
            producto_nombre: producto["productos_nombre"],
            dosis_por_parcela: dosis_por_parcela,
            dosis_por_campo: this.objetoDosisDeCadaCampoPorProducto[producto["productos_id"]],
            editable: false
          }
          console.log("Objetos producto:", objeto);
          listaProductosAImprimirEnTabla.push(objeto);
          console.log("Lista Productos Dentro for parcelas:", listaProductosAImprimirEnTabla);
        }
        console.log("Lista Productos:", listaProductosAImprimirEnTabla);


        //Declaro un objeto  temporal para poder añadirlo a  una lista de objetos SuperDesplegableConfig
        //Hay un SuperDesplegableConfig por parcela
        let objetoIDesplegableConfig: SuperDesplegableConfig = {
          headersDesplegable: cabeceraDesplegableParcela,
          componente_interno: {
            type: "super-table",
            config_table: {
              configTable: {
                canDelete: false,
                canEdit: false,
              },
              headersArrayTable: [
                "ID",
                "Producto Nombre",
                "Dosis Parcela",
                "Dosis Total Campo ",
                "editable"
              ],
              listaContenidos: listaProductosAImprimirEnTabla
            }
          },

          collapsed: true,
        }
        listaSuperDesplegableConfigParcela.push(objetoIDesplegableConfig);
      }

      let objetoIDesplegableConfigPlanificacion: SuperDesplegableConfig = {
        headersDesplegable: cabeceraDesplegableCampo,
        componente_interno: {
          type: "super-desplegable",
          config_desplegable: listaSuperDesplegableConfigParcela
        },

        collapsed: true,
        dato_por_el_que_filtrar: planificacion["planificacion_fecha_realizar"]
      }

      returnable.push(objetoIDesplegableConfigPlanificacion);
    }

    try {

    } catch (error) {
      returnable = [];
    }
    return returnable;

  }
}
