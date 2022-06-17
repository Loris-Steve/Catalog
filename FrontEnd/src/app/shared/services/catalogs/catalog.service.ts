import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderList } from '../../enums/order.enum';
import { Catalog, CatalogCreator } from '../../models/catalog.model';

const CATALOGS: Catalog[]  = [ 
{
  idCatalog: 1,
  id_User: 1, 
  titleCatalog: "magasin de prêt à porté",
  addressCatalog: '',
  latitude: 1,
  longitude : 2 ,
  activateCatalog : 0
},
{
  idCatalog: 1,
  id_User: 1, 
  titleCatalog: "title 2",
  addressCatalog: 'Paris',
  latitude: 5,
  longitude : 3 ,
  activateCatalog : 1 
},
{
  idCatalog: 1,
  id_User: 1, 
  titleCatalog: "boutique à marseillle",
  addressCatalog: 'Marseille ',
  latitude: null,
  longitude : null,
  activateCatalog : 1 
}]

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private catalogs = new BehaviorSubject<Catalog[]>(CATALOGS);
  catalogs$ = this.catalogs.asObservable();

  constructor(private http: HttpClient) { }

  create(catalog: CatalogCreator) {

    return this.http.post<any>(`${environment.hostURL}catalogs`, catalog)
      .pipe(map(element => {
        console.log("element", element);
      }));
  }

  addArticleInCatalog(id_Catalog: number, id_Article: number, quantity: number) {

    return this.http.post<any>(`${environment.hostURL}catalogs/article`,
      { id_Catalog, id_Article, quantity })
      .pipe(map(element => {
        console.log("element", element);
      }));
  }

  getCatalogByParams(
    idCatalog: number | '', id_User: number | '', titleCatalog: string | '',
    addressCatalog: string | '', latitude: number | '', longitude: number |'',
    sort: string | '', order: OrderList | '', activateCatalog: 0 | 1 | '') {

    let queryParams = new HttpParams()
      .append("idCatalog", idCatalog)
      .append("id_User", id_User)
      .append("titleCatalog", titleCatalog)
      .append("addressCatalog", addressCatalog)
      .append("latitude", latitude)
      .append("longitude", longitude)
      .append("sort", sort)
      .append("order", order)
      .append("activateCatalog", activateCatalog);
      
    return this.http.get<any>(`${environment.hostURL}catalogs`, { params: queryParams })
  }
}
