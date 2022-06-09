import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { OrderList } from '../../enums/order.enum';
import { Article, ArticleCreator } from '../../models/article.model';

const ARTICLES : Article[] = [
  {
    idArticle: 0,
    title: 'title',
    price: 0,
    description: 'string',
  },
  {
    idArticle: 0,
    title: 'title',
    price: 0,
    description: 'string',
  },
  {
    idArticle: 0,
    title: 'title',
    price: 0,
    description: 'string',
  },
];
@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articles = new BehaviorSubject<Article[]>(ARTICLES);
  articles$ = this.articles.asObservable();

  constructor(private http: HttpClient) { }

  create(article: ArticleCreator) {

    return this.http.post<any>(`${environment.hostURL}Articles`, article)
      .pipe(map((element: any) => {
        console.log("element", element);
      }));
  }

  getArticleByParams(
    idArticle: number | '', id_User: number | '', titleArticle: string | '',
    addressArticle: string | '', latitude: number | '', longitude: number |'',
    sort: string | '', order: OrderList | '', activateArticle: 0 | 1 | '') {

    let queryParams = new HttpParams()
      .append("idArticle", idArticle)
      .append("id_User", id_User)
      .append("titleArticle", titleArticle)
      .append("addressArticle", addressArticle)
      .append("latitude", latitude)
      .append("longitude", longitude)
      .append("sort", sort)
      .append("order", order)
      .append("activateArticle", activateArticle);
      
    return this.http.get<any>(`${environment.hostURL}Articles`, { params: queryParams })
  }
}
