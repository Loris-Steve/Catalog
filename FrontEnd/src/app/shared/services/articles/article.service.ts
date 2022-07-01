import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderList } from '../../enums/order.enum';
import { AddArticleQuery, Article, ArticleCreator, ArticleQuery } from '../../models/article.model';

const ARTICLES: Article[] = [
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
    imagesArticle: [],
    id_Catalog: 0,
    isProduct : 1,
    id_Category: 2,
    nameSubCategory: "string"

  },
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
    imagesArticle: [],
    id_Catalog: 0,
    isProduct : 1,
    id_Category: 2,
    nameSubCategory: "string"

  },
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
    imagesArticle: [],
    id_Catalog: 0,
    isProduct : 1,
    id_Category: 2,
    nameSubCategory: "string"

  },
];
const CATEGORYS = [
  {
    "idCategory": 1,
    "nameCategory": "Mode",
    "subCategorys": [
        {
            "idSubCategory": 1,
            "nameSubCategory": "chaussure",
            "id_Category": 1
        },
        {
            "idSubCategory": 2,
            "nameSubCategory": "coiffure",
            "id_Category": 1
        }
    ]
},
  {
    "idCategory": 2,
    "nameCategory": "test",
    "subCategorys": [
        {
            "idSubCategory": 1,
            "nameSubCategory": "test sub cat",
            "id_Category": 2
        },
    ]
}
]
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private categorys = new BehaviorSubject<any[]>(CATEGORYS);
  categorys$ = this.categorys.asObservable();

  private articles = new BehaviorSubject<Article[]>([]);
  articles$ = this.articles.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();


  private error = new BehaviorSubject<string>('');
  error$ = this.error.asObservable();

  constructor(private http: HttpClient) {

  }

  create(article: ArticleCreator) {
    console.log('article :>> ', article);
    return this.http.post<any>(`${environment.hostURL}Articles`, article)
  }

  addInCatalog(catalogId: number, articleId: number, addArticleQuery : AddArticleQuery)
   {
    console.log('catalogId : ' + catalogId + ' articleId :>> ', articleId);
    return this.http.post<any>(`${environment.hostURL}article/${catalogId}/${articleId}`, {})
      .pipe(map((element: any) => {
        console.log("element", element);
      }));
  }


  public get categoryValue(): any[]{
    return this.categorys.value;
  }

  getCategorys(){

    this.http.get<any>(`${environment.hostURL}articles/categorys`)
    .subscribe(
      data => {
        console.log("data", data);
        localStorage.setItem('categorys', JSON.stringify(data));
        this.categorys.next(data);
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
      longitude, sort, order, activateArticle,priceMin,priceMax } = articleQuery;
    // On ajoute les valeurs aux paramètres de la requête (pour filtrer)

    let queryParams = new HttpParams()
    if (id_User)
      queryParams = queryParams.append("id_User", id_User);

    if (titleArticle) {
      queryParams = queryParams.append("titleArticle", titleArticle);
    }

    if (addressArticle)
      queryParams = queryParams.append("addressArticle", addressArticle);

    if (priceMin)
      queryParams = queryParams.append("priceMin", priceMin);

    if (priceMax)
      queryParams = queryParams.append("priceMax", priceMax);

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
