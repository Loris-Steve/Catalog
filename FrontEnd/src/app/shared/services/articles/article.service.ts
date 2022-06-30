import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderList } from '../../enums/order.enum';
import { Article, ArticleCreator, ArticleQuery } from '../../models/article.model';

const ARTICLES: Article[] = [
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
    images: [],
    id_Catalog: 0

  },
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
    images: [],
    id_Catalog: 0

  },
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
    images: [],
    id_Catalog: 0

  },
];
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  //private articles = new BehaviorSubject<Article[]>(ARTICLES);
  private articles = new BehaviorSubject<Article[]>([]);
  articles$ = this.articles.asObservable();

  private error = new BehaviorSubject<string>('');
  error$ = this.error.asObservable();

  constructor(private http: HttpClient) {

  }

  create(article: ArticleCreator) {

    return this.http.post<any>(`${environment.hostURL}Articles`, article)
      .pipe(map((element: any) => {
        console.log("element", element);
      }));
  }

  getCategorys(){

    this.http.get<any>(`${environment.hostURL}articles/categorys`)
    .subscribe(
      data => {
        console.log("data", data);
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

      }
    );
  }

  // get article details
  getArticleById(catalogId: number, articleId: number): Observable<any> {

    return this.http.get<any>(`${environment.hostURL}Articles/catalogs/user/${catalogId}/${articleId}`);
  }


  getArticlesByIdCatalog(catalogId: number, catalogQuery: ArticleQuery) {
    const queryParams = this.formatParams(catalogQuery);
    return this.http.get<any>(`${environment.hostURL}articles/catalogs/${catalogId}`, { params: queryParams })
      .subscribe(
        data => {
          console.log("data", data);
          this.articles.next(data);

          //this.error.next('');
        },
        error => {

          this.articles.next(ARTICLES); // (!temporaire!) list par defaut pour Imane

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

  getArticleByParams(articleQuery: ArticleQuery) {

    const queryParams = this.formatParams(articleQuery);

    return this.http.get<any>(`${environment.hostURL}articles/catalogs`, { params: queryParams })
      .subscribe(
        data => {
          console.log("data", data);
          this.articles.next(data);
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


  formatParams(articleQuery: ArticleQuery): HttpParams {
    // on extrait les valeurs de l'objet
    const { idArticle, id_User, titleArticle, addressArticle, latitude,
      longitude, sort, order, activateArticle } = articleQuery;
    // On ajoute les valeurs aux paramètres de la requête (pour filtrer)

    let queryParams = new HttpParams()
    if (id_User)
      queryParams = queryParams.append("id_User", id_User);

    if (titleArticle) {
      queryParams = queryParams.append("titleArticle", titleArticle);
    }

    if (addressArticle)
      queryParams = queryParams.append("addressArticle", addressArticle);

    if (latitude)
      queryParams = queryParams.append("latitude", latitude);

    if (longitude)
      queryParams = queryParams.append("longitude", longitude);

    if (sort)
      queryParams = queryParams.append("sort", sort);

    if (order)
      queryParams = queryParams.append("order", order);

    if (activateArticle)
      queryParams = queryParams.append("activateArticle", activateArticle);

    return queryParams;
  }
}
