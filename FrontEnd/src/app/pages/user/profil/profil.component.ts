import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs';
import { OrderList } from 'src/app/shared/enums/order.enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogService } from 'src/app/shared/services/catalog/catalog.service';
import { AddArticleFormComponent } from '../add-article-form/add-article-form.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string = '/search';
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private catalogService: CatalogService,
  ) {

    if (!this.authService.userValue) {
      this.router.navigate(['/']);
    }

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
