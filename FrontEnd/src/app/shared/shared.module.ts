import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { ArticleComponent } from './components/search/article/article.component';
import { MatIconModule } from '@angular/material/icon';
import { CustomSearchFilterComponent } from './components/search/custom-search-filter/custom-search-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogDetailsComponent } from './components/user/catalog/catalog-details/catalog-details.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ContentLayoutComponent,
    ArticleComponent,
    CustomSearchFilterComponent,
    CatalogDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    //ContentLayoutComponent,
    ArticleComponent,
    NavbarComponent,
    FooterComponent,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
