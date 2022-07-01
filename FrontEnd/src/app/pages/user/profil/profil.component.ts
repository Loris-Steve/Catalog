import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { ArticleSearchStyle } from 'src/app/shared/enums/article-search-style.enum';
import { OrderList } from 'src/app/shared/enums/order.enum';
import { Article, ArticleQuery } from 'src/app/shared/models/article.model';
import { Catalog, CatalogQuery } from 'src/app/shared/models/catalog.model';
import { User } from 'src/app/shared/models/user.model';
import { ArticleService } from 'src/app/shared/services/articles/article.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogService } from 'src/app/shared/services/catalogs/catalog.service';
import { UserService } from 'src/app/shared/services/users/user.service';

const DEFAULT_POFIL_IMAGE_LINK = "https://media.istockphoto.com/vectors/default-avatar-profile-icon-vector-vector-id1337144146?b=1&k=20&m=1337144146&s=170667a&w=0&h=ys-RUZbXzQ-FQdLstHeWshI4ViJuEhyEa4AzQNQ0rFI=";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  returnUrl: string = '/search';

  loadingCatalog = false;
  errorCatalog = '';
  loadingUser = false;
  errorUser = '';
  loadingArticle = false;
  errorArticle = '';

  user: User = <User>{};
  catalogs: Catalog[] = [];
  articles: Article[] = [];

  updateOption: boolean = false;

  showDetailCatalog: boolean = false;
  currentCatalogId: number | undefined;
  currentCatalog: Catalog = <Catalog>{};

  articleListStyle: ArticleSearchStyle = ArticleSearchStyle.CARD;

  types = Object(ArticleSearchStyle);
  
  imageProfil : string  = DEFAULT_POFIL_IMAGE_LINK;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService,
    private catalogService: CatalogService,
    private articleService: ArticleService,
    private route: ActivatedRoute,

  ) {

    this.userService.user$.subscribe((user) => {
      this.user = user || this.user
      if(this.user.photo){
        this.imageProfil = this.user.photo;
      }
      else{
        this.imageProfil = DEFAULT_POFIL_IMAGE_LINK;
      }
    });
    this.userService.loading$.subscribe((loading) => this.loadingUser = loading);
    this.userService.error$.subscribe((error) => this.errorUser = error);

    this.catalogService.catalogs$.subscribe((catalogList) => this.catalogs = catalogList)
    this.catalogService.loading$.subscribe((loading) => this.loadingCatalog = loading);
    this.catalogService.error$.subscribe((error) => this.errorCatalog = error);

    this.articleService.articles$.subscribe((articleList) => this.articles = articleList)
    this.articleService.loading$.subscribe((loading) => this.loadingArticle = loading);
    this.articleService.error$.subscribe((error) => this.errorArticle = error);

  }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        console.log(params,this.authService.userValue?.idUser);
        if(params['userId'] == this.authService.userValue?.idUser)
          this.updateOption = true;

        this.userService.getUserById(params['userId']);
        this.loadCatalogs(params['userId']);
        if (params['catalogId']) {
          this.loadArticles(params['catalogId']);
          this.loadArticles(params['catalogId']);
          this.showDetailCatalog = true;
          this.currentCatalogId = params['catalogId'];
        }
      });

    this.route.queryParams
      .subscribe(params => {
        console.log(' query params :>> ', params);
        // const articleQuery: ArticleQuery = {
        //   idArticle: params['idArticle'],
        //   id_User: params['id_User'],
        //   titleArticle: params['titleArticle'],
        //   id_SubCategory: params['id_SubCategory'],
        //   addressArticle: params['addressArticle'],
        //   latitude: params['latitude'],
        //   longitude: params['longitude'],
        //   sort: params['sort'],
        //   order: params['order'],
        //   activateArticle: params['activateArticle']
        // }
      }
      );
  }

  
    // chnage le style de la liste (card , list)
    changeStyle(style: ArticleSearchStyle): void {
      this.articleListStyle = style;
    }

  // get catalog of articles
  loadArticleCatalog(){

  }
  
  loadArticles(catalogId: number) {

    const articleQuery: ArticleQuery = {
      idArticle: '',
      id_User: '',
      titleArticle: '',
      id_SubCategory: '',
      addressArticle: '',
      latitude: '',
      longitude: '',
      priceMin : '',
      priceMax : '',
      sort: '',
      order: '',
      activateArticle: ''
    }

    this.articleService.getArticlesByIdCatalog(catalogId, articleQuery);

  }

  loadCatalogs(userId: number) {

      const idCatalog = '';
      const titleCatalog = '';
      const addressCatalog = '';
      const latitude = '';
      const longitude = '';
      const sort = '';
      const order = '';
      const activateCatalog = '';

      const catalogQuery: CatalogQuery = {
        id_User: userId,
        idCatalog,
        titleCatalog,
        addressCatalog,
        latitude,
        longitude,
        sort,
        order,
        activateCatalog,
      }

      this.catalogService.getCatalogByIdUser(userId, catalogQuery);

  }

}
