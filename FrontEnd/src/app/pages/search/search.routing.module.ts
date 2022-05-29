import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { SearchComponent } from './search.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'search'
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'article-details',
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
