import { Component, OnInit } from '@angular/core';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  articles: Article[] = [
    {
      idArticle: 0,
      title: "art1",
      price: 12,
      description: "au top",
    },
    {
      idArticle: 0,
      title: "art1",
      price: 12,
      description: "au top",
    },
    {
      idArticle: 0,
      title: "art1",
      price: 12,
      description: "au top",
    },
  ];

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;

  types = Object(ArticleSearchStyle);
  
  constructor() { }

  ngOnInit(): void {
  }

  // chnage le style de la liste (card , list)
  changeStyle(style: ArticleSearchStyle): void {
    this.articleListStyle = style;
  }
}
