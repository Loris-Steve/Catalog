import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';
import { User } from 'src/app/shared/models/user.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { first } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Catalog } from 'src/app/shared/models/catalog.model';

const DEFAULT_ARTICLE_IMAGE_LINK = "#";

const DEFAULT_POFIL_IMAGE_LINK = "https://cdn.pixabay.com/photo/2017/06/09/23/22/avatar-2388584_960_720.png";

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

  imageArticle : string[]  = [];

  imageProfil : string  = DEFAULT_POFIL_IMAGE_LINK;

  
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

  }

  changePicture(){

    if(this.article.imagesArticle){
      this.imageArticle = this.article.imagesArticle;
    }
    else{
      this.imageArticle = [DEFAULT_ARTICLE_IMAGE_LINK];
    }

    console.log('enter this.user :>> ', this.user);
    if(this.user.photo){
      this.imageProfil = this.user.photo;
    }
    else{
      this.imageProfil = DEFAULT_POFIL_IMAGE_LINK;
    }
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

          this.changePicture();
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
