import { Component, Input, OnInit } from '@angular/core';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';

const DEFAULT_CATALOG_IMAGE_LINK = "https://images.pexels.com/photos/929245/pexels-photo-929245.jpeg?cs=srgb&dl=pexels-artem-beliaikin-929245.jpg&fm=jpg";

@Component({
  selector: 'app-catalog-details',
  templateUrl: './catalog-details.component.html',
  styleUrls: ['./catalog-details.component.scss']
})
export class CatalogDetailsComponent implements OnInit {

  @Input() catalog : Catalog = <Catalog>{};

  imageCatalog : string = DEFAULT_CATALOG_IMAGE_LINK;

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;

  types = Object(ArticleSearchStyle);
  
  constructor( ) {}

  ngOnInit(): void {
    if(this.catalog.imagesCatalog[0]){
      this.imageCatalog = this.catalog.imagesCatalog[0];
    }
    else{
      this.imageCatalog = DEFAULT_CATALOG_IMAGE_LINK;
    }
  }


}
