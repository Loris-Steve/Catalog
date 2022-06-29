import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article = <Article>{};
  @Input() typeList: ArticleSearchStyle = ArticleSearchStyle.CARD;
  types = Object(ArticleSearchStyle);

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log('this.article :>> ', this.article);
  }
  

  navigate(id_Catalog : number,idArticle:number){
    console.log('"object" :>> ', "object");
    this.router.navigate([`/search/article-details/${id_Catalog}/${idArticle}`]);
  }
}
