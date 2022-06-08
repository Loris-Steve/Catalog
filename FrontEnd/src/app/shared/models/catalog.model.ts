export interface Catalog {
    idCatalog: number | undefined,
    id_User: number | undefined, // siren with companys
    titleCatalog: string,
    addressCatalog: string | null,
    latitude: number | null,
    longitude : number | null ,
    activateCatalog : boolean ,
}