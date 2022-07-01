import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { Article, ArticleQuery } from 'src/app/shared/models/article.model';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { CatalogService } from 'src/app/shared/services/catalogs/catalog.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '/search';
  error = '';

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;

  types = Object(ArticleSearchStyle);

  catalogs: Catalog[] = [];
  articles: Article[] = [];

  categorys: any[] = [];
  subCategorys: any[] = [];
  currentCatalogId: number | undefined

  currentPage: number = 0;

  constructor(
    private catalogService: CatalogService,
    public articleService: ArticleService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    this.articleService.articles$.subscribe((articleList) => {
      //console.log('articleList :>> ', articleList);
      this.articles = articleList
    });

    this.catalogService.catalogs$.subscribe((catalogList) => this.catalogs = catalogList);

    this.articleService.loading$.subscribe((loading) => this.loading = loading);
    this.articleService.error$.subscribe((error) => this.error = error);

    this.articleService.categorys$.subscribe((categorys) => this.categorys = categorys);

    this.searchForm = this.formBuilder.group({
      titleArticle: [''],
      id_SubCategory: [''],
      addressArticle: [''],
      latitude: [''],
      longitude: [''],
      priceMin: [''],
      priceMax: [''],
      sort: [''],
      order: ['DESC'],
      activateArticle: ['']
    });

    this.articleService.categorys$.subscribe((categorys) => {
      this.categorys = categorys;
      console.log("categorys");
      if (this.categorys[0]) {
        this.subCategorys = this.categorys[0].subCategorys;
        //console.log('this.subCategorys vv :>> ', this.subCategorys[0].idSubCategory);
        // if(this.subCategorys[0])
        //   this.searchForm.patchValue({ id_SubCategory : this.subCategorys[0].idSubCategory }); 
      }
    });

  }


  ngOnInit() {
    //console.log('this.articles :>> ', this.articles);
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.articleService.getCategorys();

  }

  // convenience getter for easy access to form fields
  get f() { return this.searchForm.controls; }


  // chnage le style de la liste (card , list)
  changeStyle(style: ArticleSearchStyle): void {
    this.articleListStyle = style;
  }

  changeCategory(event: any) {
    const categoryId = event.target.value;
    console.log('categoryId :>> ', categoryId);
    if (categoryId) {
      this.subCategorys = this.categorys.filter(cat => cat.idCategory == categoryId)[0].subCategorys;
      this.searchForm.patchValue({ id_SubCategory : this.subCategorys[0].idSubCategory }); 
    }
  }

  previousPage() {
    if (this.currentPage > 0) {

      this.currentPage -= 1
      this.onSubmit();
    }
  }

  nextPage() {
    this.currentPage += 1;
    this.onSubmit();

  }

  onSubmit() {
    this.submitted = true;

    this.loading = true;

    const articleQuery: ArticleQuery = {
      idArticle: '',
      id_User: '',
      titleArticle: this.searchForm.value['titleArticle'],
      id_SubCategory: this.searchForm.value['id_SubCategory'] == 'all' ? '' : this.searchForm.value['id_SubCategory'],
      addressArticle: this.searchForm.value['addressArticle'],
      latitude: this.searchForm.value['latitude'],
      longitude: this.searchForm.value['longitude'],
      priceMin: this.searchForm.value['priceMin'],
      priceMax: this.searchForm.value['priceMax'],
      sort: this.searchForm.value['sort'],
      order: this.searchForm.value['order'],
      activateArticle: this.searchForm.value['activateArticle'],
      page: this.currentPage
    }

    this.articleService.getArticleByParams(articleQuery);
  }

}
