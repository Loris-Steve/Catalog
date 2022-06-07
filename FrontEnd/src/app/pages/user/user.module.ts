import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { UserRoutingModule } from './user.routing.module';
import { RouterModule } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ProfilComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    RouterModule,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class UserModule { }
