import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
