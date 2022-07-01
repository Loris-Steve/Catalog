import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddArticleQuery, ArticleCreator } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { first } from 'rxjs';
import { ArticleType } from 'src/app/shared/enums/article.enum';
import { CatalogService } from 'src/app/shared/services/catalogs/catalog.service';

const DEFAULT_PICTURE_LINK = "#";

@Component({
  selector: 'app-add-article-form',
  templateUrl: './add-article-form.component.html',
  styleUrls: ['./add-article-form.component.scss']
})
export class AddArticleFormComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string = '/';
  error = '';

  pictureLink : string = DEFAULT_PICTURE_LINK;

  typesArticle = Object(ArticleType);
  categorys : any[] = [];
  subCategorys : any[] = [];
  currentCatalogId : number | undefined
  public articleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private catalogService: CatalogService,
    private router: Router,
    private authService : AuthService
  ) {
    
    this.articleForm = this.fb.group({
      titleArticle: ['', [Validators.required]],
      priceArticle: ['', []],
      descriptionArticle: ['', []],
      id_SubCategory: ['', [Validators.required]],
      imagesArticle: ['', []],
      isProduct: [1, []]
    });
    
    this.articleService.categorys$.subscribe((categorys) => {
      this.categorys = categorys;
      console.log("categorys");
      if(this.categorys[0]){
        this.subCategorys = this.categorys[0].subCategorys; 
        //console.log('this.subCategorys vv :>> ', this.subCategorys[0].idSubCategory);
        if(this.subCategorys[0])
          this.articleForm.patchValue({ id_SubCategory : this.subCategorys[0].idSubCategory }); 
      }
    }
     )
  }

  ngOnInit(): void {
    this.returnUrl = "/user/profil/"+this.authService.userValue?.idUser;
    this.route.params
    .subscribe(params => {
        this.currentCatalogId = params['catalogId'];
        this.returnUrl = this.returnUrl + '/' +this.currentCatalogId;
    });
    
    if(!(this.articleService.categoryValue.length > 5)){
      this.articleService.getCategorys();
    }

   // console.log('this.categorys :>> ', this.categorys);
  }

  get f() { return this.articleForm.controls; }

  changePicture(event:any){
    const pictureLink = event.target.value;
    console.log('pictureLink :>> ', pictureLink);
    if(pictureLink){
      
      this.pictureLink = pictureLink ;
      this.articleForm.patchValue({ imagesArticle : pictureLink });
    }
    else
      this.pictureLink = DEFAULT_PICTURE_LINK;
  }
  
  changeCategory(event:any){
    const categoryId = event.target.value;
    console.log('categoryId :>> ', categoryId);
    if(categoryId){
      this.subCategorys = this.categorys.filter(cat => cat.idCategory == categoryId)[0].subCategorys;
      
    }
  }

  addArticle() {

    const titleArticle = this.articleForm.value['titleArticle'];
    const priceArticle = this.articleForm.value['priceArticle'];
    const descriptionArticle = this.articleForm.value['descriptionArticle'];
    const id_SubCategory = this.articleForm.value['id_SubCategory'];
    const imagesArticle = this.articleForm.value['imagesArticle'];
    const isProduct = this.articleForm.value['isProduct'];
    
    console.log('titleArticle : ', titleArticle);
    console.log('priceArticle : ', priceArticle);
    console.log('descriptionArticle : ', descriptionArticle);
    console.log('id_SubCategory : ', id_SubCategory);
    console.log('imagesArticle',imagesArticle);
    console.log('isProduct',isProduct);

    this.submitted = true;

    // stop here if form is invalid
    if (this.articleForm.invalid) {
      return;
    }

    this.loading = true;

    const article: ArticleCreator = {
      titleArticle,
      priceArticle,
      descriptionArticle,
      id_SubCategory,
      imagesArticle,
      isProduct,
    };

    this.articleService.create( article)
    .pipe(first())
      .subscribe(
        (data:any) => {
          this.router.navigate([this.returnUrl]);
          if(this.currentCatalogId){

            const addArticleQuery : AddArticleQuery= {
              quantityArticle : 0,
              available : 1,
              rank : 1
            };
            this.catalogService.addArticleInCatalog(this.currentCatalogId,data.idArticle,addArticleQuery);
          }
        },
        error => {
          switch (error.status) {
            case 400:
              this.error = error?.error?.message; // erreur serveur
              break;
            case 401:
              this.error = error?.error?.message; // erreur serveur
              break;
            case 403:
              this.error = error?.error?.message; // erreur serveur
              break;
            default:
              this.error = "badRequest"
              break
          }

          this.loading = false;
        });
  }
}
