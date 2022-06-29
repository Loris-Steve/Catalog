import { Component, Input, OnInit } from '@angular/core';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss']
})
export class CatalogDetailsComponent implements OnInit {

  @Input() catalog : Catalog = <Catalog>{};

  @Input() articles : Article[] = [];

  @Input() catalogId:number | undefined;

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;

  types = Object(ArticleSearchStyle);
  
  constructor( ) {}

  ngOnInit(): void {
  }

    // chnage le style de la liste (card , list)
    changeStyle(style: ArticleSearchStyle): void {
      this.articleListStyle = style;
    }

}
