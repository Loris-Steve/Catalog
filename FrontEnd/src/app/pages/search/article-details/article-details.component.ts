import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';
import { User } from 'src/app/shared/models/user.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from 'src/app/shared/models/catalog.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  
  loading = false;
  error = '';

  article : Article = <Article>{};
  user: User = <User>{};
  catalog : Catalog = <Catalog>{};

  constructor( 
    private route : ActivatedRoute,
    public articleService: ArticleService,
    ) { }
  
  

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        console.log(params);
        this.loadArticle(params['catalogId'],params['articleId'])
      }
    );
    
    this.user.idUser = 5; // to test
  }

  loadArticle(catalogId: number, articleId: number) {
    this.loading = true;
    this.articleService.getArticleById(
      catalogId, articleId)
      .pipe(first())
      .subscribe(
        data => {
          this.user = data.user;
          this.article = data.article;
          this.catalog = data.catalog;

          console.log('article details',data);
          //this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log("error");
          switch (error.status) {
            case 401:
              this.error = "unknow verify your credentials"
              break;
            default:
              this.error = error?.error?.message; // erreur serveur
              break
          }

          this.loading = false;
        });
  }

}
