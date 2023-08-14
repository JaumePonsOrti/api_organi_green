
export interface ISuperDesplegableConfig {
    headersDesplegable: ICabezeraDesplegableConfig[];
    componente_interno: ISuperDesplegableComponenteInternoConfig;
    collapsed: boolean;
    dato_por_el_que_filtrar?: string;
}
/*
El nombre del campo se puede omitir
*/
export interface ICabezeraDesplegableConfig {
    dato_mostrado: string;
    nombre_campo?: string;
}

export interface ISuperDesplegableComponenteInternoConfig {
    type: string;
    config_table?: ISuperTableDesplegableConfig;

    config_desplegable?: ISuperDesplegableConfig[];
}

export interface ISuperTableDesplegableConfig {
    headersArrayTable: string[];
    configTable: SuperTableConfig;
    listaContenidos: any[];
}

export interface SuperTableConfig {
    canDelete: boolean,
    canEdit: boolean
}
