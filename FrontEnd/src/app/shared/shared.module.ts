import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { ContentLayoutComponent } from './content-layout/content-layout.component';
import { ArticleComponent } from './components/articles/article/article.component';
import { MatIconModule } from '@angular/material/icon';
import { CustomSearchFilterComponent } from './components/search/custom-search-filter/custom-search-filter.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddArticleFormComponent } from '../pages/user/add-article-form/add-article-form.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { CatalogDetailsComponent } from './components/catalogs/catalog-details/catalog-details.component';
import { CatalogListComponent } from './components/catalogs/catalog-list/catalog-list.component';
import { CatgoryDropdownFormComponent } from './components/search/catgory-dropdown-form/catgory-dropdown-form.component';
import { AuthInterceptor } from './services/JwtInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
//import { CatalogComponent } from './components/catalogs/catalog/catalog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ArticleComponent,
    CustomSearchFilterComponent,
    CatalogDetailsComponent,
    AddArticleFormComponent,
    AddArticleComponent,
    ArticleListComponent,
    CatalogListComponent,
    CatgoryDropdownFormComponent

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
    CatalogDetailsComponent,
    AddArticleFormComponent,
    AddArticleComponent,
    ArticleListComponent,
    CatalogListComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
