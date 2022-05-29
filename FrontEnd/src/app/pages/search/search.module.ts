import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { SearchComponent } from './search.component';
import { SearchRoutingModule } from './search.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SearchComponent,
    ArticleDetailsComponent,
  ],
  imports: [
    SearchRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class SearchModule { }
