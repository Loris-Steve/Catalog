import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { UserRoutingModule } from './user.routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule
  ]
})
export class UserModule { }
