import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article = <Article>{};
  @Input() list: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigate(idArticle:number){
    this.router.navigate(['/search/article-details/'+idArticle]);
  }
}
