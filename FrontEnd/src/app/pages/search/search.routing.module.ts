import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { SearchComponent } from './search.component';

const routes: Routes = [

  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'search',
    redirectTo: 'search'
  },
  {
    path: 'article-details/:idArticle',
    component: ArticleDetailsComponent,
  },
  // {
  //   path: '**',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
