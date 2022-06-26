import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderList } from '../../enums/order.enum';
import { Article, ArticleCreator, ArticleQuery } from '../../models/article.model';

const ARTICLES: Article[] = [
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
  },
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
  },
  {
    idArticle: 0,
    titleArticle: 'title',
    priceArticle: 0,
    descriptionArticle: 'string',
  },
];
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private articles = new BehaviorSubject<Article[]>(ARTICLES);
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

  getArticleByParams(articleQuery: ArticleQuery) {
    // on extrait les valeurs de l'objet
    const { idArticle, id_User, titleArticle, addressArticle, latitude,
      longitude, sort, order, activateArticle } = articleQuery;

    // On ajoute les valeurs aux paramètres de la requête (pour filtrer)
    let queryParams = new HttpParams()
    if (idArticle)
      queryParams.append("idArticle", idArticle);
    if (id_User)
      queryParams.append("id_User", id_User);

    if (titleArticle)
      queryParams.append("titleArticle", titleArticle);

    if (addressArticle)
      queryParams.append("addressArticle", addressArticle);

    if (latitude)
      queryParams.append("latitude", latitude);

    if (longitude)
      queryParams.append("longitude", longitude);

    if (sort)
      queryParams.append("sort", sort);

    if (order)
      queryParams.append("order", order);

    if (activateArticle)
      queryParams.append("activateArticle", activateArticle);

    return this.http.get<any>(`${environment.hostURL}Articles`, { params: queryParams })
    .subscribe(
      data => {
        console.log("data",data);
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
}
