import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article = <Article>{};
  @Input() list: boolean = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
