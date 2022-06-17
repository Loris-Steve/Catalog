import { Component, OnInit } from '@angular/core';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { CatalogService } from 'src/app/shared/services/catalogs/catalog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;

  types = Object(ArticleSearchStyle);
  
  catalogs : Catalog[] = [];
  articles : Article[] = [];

  constructor(
    private catalogService: CatalogService,
    private articleService: ArticleService,
    ) {
  
      this.articleService.articles$.subscribe((articleList) => this.articles = articleList)
     
      this.catalogService.catalogs$.subscribe((catalogList) => this.catalogs = catalogList)
  
    }

  ngOnInit(): void {
  }

  // chnage le style de la liste (card , list)
  changeStyle(style: ArticleSearchStyle): void {
    this.articleListStyle = style;
  }
}
