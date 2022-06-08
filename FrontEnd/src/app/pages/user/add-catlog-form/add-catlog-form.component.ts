import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Catalog } from 'src/app/shared/models/catalog.model';
import { CatalogService } from 'src/app/shared/services/catalog/catalog.service';

@Component({
  selector: 'app-add-catlog-form',
  templateUrl: './add-catlog-form.component.html',
  styleUrls: ['./add-catlog-form.component.scss']
})
export class AddCatlogFormComponent implements OnInit {

  
  loading = false;
  submitted = false;
  returnUrl: string = '/search';
  error = '';

  public catalogForm: FormGroup ;
  
  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private router: Router,
    ) { 
      
    this.catalogForm = this.fb.group({
      titleCatalog: ['', [Validators.required]],
      addressCatalog: ['', []],
      latitude: ['', []],
      longitude: ['',[]],
    });
    
    }

  ngOnInit(): void {
  }

  addCatalog() {

    const titleCatalog = this.catalogForm.value['titleCatalog'];
    const addressCatalog = this.catalogForm.value['addressCatalog'];
    const latitude = this.catalogForm.value['latitude'];
    const longitude = this.catalogForm.value['longitude'];
    //const sort = this.catalogForm.value['sort'];
    //const order = this.catalogForm.value['order'];

    console.log('titleCatalog : ', titleCatalog);
    console.log('addressCatalog : ', addressCatalog);
    console.log('latitude : ', latitude);
    console.log('longitude : ', longitude);

    this.submitted = true;

    // stop here if form is invalid
    if (this.catalogForm.invalid) {
      return;
    }

    this.loading = true;

    const catalog : Catalog = { idCatalog  : undefined, id_User  : undefined, titleCatalog,addressCatalog,latitude,longitude , activateCatalog :  true } ;
    this.catalogService.create(
    catalog
    )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
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
