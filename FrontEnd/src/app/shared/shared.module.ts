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
import { AddArticleFormComponent } from './components/articles/add-article-form/add-article-form.component';
import { AddArticleComponent } from './components/articles/add-article/add-article.component';
import { ArticleListComponent } from './components/articles/article-list/article-list.component';
import { CatalogDetailsComponent } from './components/catalogs/catalog-details/catalog-details.component';
import { CatalogListComponent } from './components/catalogs/catalog-list/catalog-list.component';

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
    CatalogListComponent

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

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
