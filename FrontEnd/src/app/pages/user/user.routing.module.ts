import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/injectables/AuthGuard';
import { AccountComponent } from './account/account.component';
import { AddCatlogFormComponent } from './add-catlog-form/add-catlog-form.component';
import { LoginComponent } from './login/login.component';
import { ProfilComponent } from './profil/profil.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [

  {
    path: 'account',
    component: AccountComponent,
    canActivate: [AuthGuard] // verifier si on est connecter pour accéder à la page
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profil/:idUser',
    component: ProfilComponent,
  },
  {
    path: 'add-catalog',
    component: AddCatlogFormComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
