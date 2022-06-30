import { Component, Input, OnInit } from '@angular/core';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  
  @Input() articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;
  @Input() articles: Article[] = [];

  types = Object(ArticleSearchStyle);

  constructor() { }

  ngOnInit(): void {
  }

}
