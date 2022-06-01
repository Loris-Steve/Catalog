import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article : Article = <Article>{};
  user: User = <User>{};

  constructor() { }

  ngOnInit(): void {

    this.user.idUser = 5; // to test
  }

}
