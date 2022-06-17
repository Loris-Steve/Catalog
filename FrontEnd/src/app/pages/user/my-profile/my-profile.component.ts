import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { AddArticleFormComponent } from 'src/app/shared/components/articles/add-article-form/add-article-form.component';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogService } from 'src/app/shared/services/catalogs/catalog.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string = '/search';
  error = '';

  showDetailCatalog : boolean = false;
  currentCatalogId: number | undefined = undefined;

  catalogs : Catalog[] = [];
  currentCatalog : Catalog = <Catalog>{};

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private catalogService: CatalogService,
  ) {

    if(!this.authService.isAuth){
      this.router.navigate(['/'])
    }

    this.catalogService.catalogs$.subscribe((catalogList) => this.catalogs = catalogList)
  
  }

  ngOnInit(): void {
    this.loadCatalog();
  }


  openCreateArticleModal() {
    this.modalService.open(AddArticleFormComponent, { size: 'xl' });
  }

  loadCatalog() {

    const userId = this.authService.userValue?.idUser || '';

    const idCatalog = ''; 
    const titleCatalog = '';
    const addressCatalog = ''; 
    const latitude = ''; 
    const longitude = '';
    const sort = ''; 
    const order = ''; 
    const activateCatalog = '';
    
    this.catalogService.getCatalogByParams(idCatalog, userId, titleCatalog,
      addressCatalog, latitude, longitude,
      sort, order, activateCatalog)

      .pipe(first())
      .subscribe(
        data => {
          console.log('data :>> ', data);
        },
        error => {
          switch (error.status) {
            case 400:
              this.error = "badRequest"
              break;
            default:
              this.error = error?.error?.message; // erreur serveur
              break
          }

          this.loading = false;
        });
  }

}
