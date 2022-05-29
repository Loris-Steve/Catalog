import { Component, OnInit } from '@angular/core';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style';
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
      images : []
    },
    {
      idArticle: 0,
      title: "art1",
      price: 12,
      description: "au top",
      images : []
    },
    {
      idArticle: 0,
      title: "art1",
      price: 12,
      description: "au top",
      images : []
    },
  ];

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.List;

  codeListStyle = "article-list-style";
  codeCardStyle = "article-card-style"
  codeArticleStyle = ""; 
  
  constructor() { }

  ngOnInit(): void {
    
    this.codeArticleStyle = this.codeCardStyle;
  }

}
