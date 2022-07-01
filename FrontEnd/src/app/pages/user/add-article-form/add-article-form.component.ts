import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleCreator } from 'src/app/shared/models/article.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { first } from 'rxjs';
import { ArticleType } from 'src/app/shared/enums/article.enum';

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

  public articleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private router: Router,
    private authService : AuthService
  ) {

    this.articleService.categorys$.subscribe((categorys) => this.categorys = categorys)

    this.articleForm = this.fb.group({
      titleArticle: ['', [Validators.required]],
      priceArticle: ['', []],
      descriptionArticle: ['', []],
      id_SubCategory: ['', []],
      imagesArticle: ['', []],
      typeArticle: ['', []]
    });

  }

  ngOnInit(): void {
    this.returnUrl = "/user/profil/"+this.authService.userValue?.idUser;
    if(!(this.articleService.categoryValue.length > 0)){
      this.articleService.getCategorys();
    }

    console.log('this.categorys :>> ', this.categorys);
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
  
  addArticle() {

    const titleArticle = this.articleForm.value['titleArticle'];
    const priceArticle = this.articleForm.value['priceArticle'];
    const descriptionArticle = this.articleForm.value['descriptionArticle'];
    const id_SubCategory = this.articleForm.value['id_SubCategory'];
    const imagesArticle = this.articleForm.value['imagesArticle'];
    const typeArticle = this.articleForm.value['typeArticle'];
    
    console.log('titleArticle : ', titleArticle);
    console.log('priceArticle : ', priceArticle);
    console.log('descriptionArticle : ', descriptionArticle);
    console.log('id_SubCategory : ', id_SubCategory);
    console.log('imagesArticle',imagesArticle);
    console.log('typeArticle',typeArticle);

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
      typeArticle,
    };

    this.articleService.create( article)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
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
