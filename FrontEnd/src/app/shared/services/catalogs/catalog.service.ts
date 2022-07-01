import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderList } from '../../enums/order.enum';
import { Catalog, CatalogCreator, CatalogQuery } from '../../models/catalog.model';
import { User } from '../../models/user.model';
import { AuthService } from '../auth.service';

const CATALOGS: Catalog[]  = [ 
{
  idCatalog: 1,
  id_User: 1, 
  titleCatalog: "magasin de prêt à porter",
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

  private currentCatalog = new BehaviorSubject<Catalog>(<Catalog>{});
  currentCatalog$ = this.currentCatalog.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private error = new BehaviorSubject<string>('');
  error$ = this.error.asObservable();

  constructor(private http: HttpClient,private authService:AuthService) {
    
  }

  create(catalog: CatalogCreator) {
    let currentQuery: any = catalog;
    
    // on n'envoie pas latitude et longitude si on ne les a pas
    if(!catalog.latitude || !catalog.longitude){
      const {latitude,longitude, ...rest} = catalog;
      currentQuery = rest;
    }

    return this.http.post<any>(`${environment.hostURL}catalogs/user/${this.authService.userValue?.idUser}`, currentQuery)
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

  getCatalogById(catalogId: number){
    
     return this.http.get<any>(`${environment.hostURL}catalogs/${catalogId}`)
     .subscribe(
       data => {
         console.log("data currentCatalog : ",data);
         this.currentCatalog.next(data);
       },
       error => {  
                  
         switch (error.status) {
           case 400:
             this.error.next("badRequest");
             break;
           default:
             this.error.next(error?.error?.message); // erreur serveur
             break
         }
 
       },
       () => this.loading.next(false) // finally
       );
  }

  getCatalogByIdUser(userId: number, catalogQuery : CatalogQuery){
    const queryParams = this.formatParams(catalogQuery);
     return this.http.get<any>(`${environment.hostURL}catalogs/user/${userId}`, { params: queryParams })
     .subscribe(
       data => {
         console.log("data",data);
         this.catalogs.next(data);
       },
       error => {  
         
         this.catalogs.next(CATALOGS); // (!temporaire!) list par defaut pour Imane
         
         switch (error.status) {
           case 400:
             this.error.next("badRequest");
             break;
           default:
             this.error.next(error?.error?.message); // erreur serveur
             break
         }
 
       },
       () => this.loading.next(false) // finally
       );
   }

  getCatalogByParams(catalogQuery : CatalogQuery){
   const queryParams = this.formatParams(catalogQuery);
      
    return this.http.get<any>(`${environment.hostURL}catalogs`, { params: queryParams })
    .subscribe(
      data => {
        console.log("data",data);
        this.catalogs.next(data);
      },
      error => {  
        
        this.catalogs.next(CATALOGS); // (!temporaire!) list par defaut pour Imane
        
        switch (error.status) {
          case 400:
            this.error.next("badRequest");
            break;
          default:
            this.error.next(error?.error?.message); // erreur serveur
            break
        }

      },
      () => this.loading.next(false) // finally
      );
  }

  formatParams( catalogQuery : CatalogQuery ) : HttpParams{
    const { 
    idCatalog, id_User, titleCatalog, addressCatalog, latitude,
     longitude, sort, order, activateCatalog
  } = catalogQuery;

  let queryParams = new HttpParams()
  if(idCatalog)
    queryParams = queryParams.append("idCatalog", idCatalog)
  if(id_User)
    queryParams = queryParams.append("id_User", id_User)
  if(titleCatalog)
    queryParams = queryParams.append("titleCatalog", titleCatalog)
  if(addressCatalog)
    queryParams = queryParams.append("addressCatalog", addressCatalog)
  if(latitude)
    queryParams = queryParams.append("latitude", latitude)
  if(longitude)
    queryParams = queryParams.append("longitude", longitude)
  if(sort)
    queryParams = queryParams.append("sort", sort)
  if(order)
    queryParams = queryParams.append("order", order)
  if(activateCatalog)
    queryParams = queryParams.append("activateCatalog", activateCatalog);
    
    return queryParams;
  }

}
