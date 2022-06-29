import { OrderList } from "../enums/order.enum";

export interface CatalogCreator {
    titleCatalog: string,
    addressCatalog: string | null,
    latitude: number | null,
    longitude: number | null,
}

export interface Catalog {
    idCatalog: number,
    id_User: number, // siren with companys
    titleCatalog: string,
    addressCatalog: string,
    latitude: number | null,
    longitude: number | null,
    activateCatalog: 1 | 0,
}

export interface CatalogQuery {
    idCatalog: number | '',
    id_User: number | '',
    titleCatalog: string | '',
    addressCatalog: string | '',
    latitude: number | '',
    longitude: number | '',
    sort: string | '',
    order: OrderList | '',
    activateCatalog: 0 | 1 | ''
}