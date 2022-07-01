import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { Catalog, CatalogCreator } from 'src/app/shared/models/catalog.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CatalogService } from 'src/app/shared/services/catalogs/catalog.service';

const DEFAULT_PICTURE_LINK = "#";

@Component({
  selector: 'app-add-catlog-form',
  templateUrl: './add-catlog-form.component.html',
  styleUrls: ['./add-catlog-form.component.scss']
})
export class AddCatlogFormComponent implements OnInit {


  loading = false;
  submitted = false;
  returnUrl: string = '/';
  error = '';

  pictureLink : string = DEFAULT_PICTURE_LINK;

  public catalogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private router: Router,
    private authService : AuthService
  ) {

    this.catalogForm = this.fb.group({
      titleCatalog: ['', [Validators.required]],
      addressCatalog: ['', []],
      latitude: ['', []],
      longitude: ['', []],
      imagesCatalog: ['', []],
      activateCatalog: [1, []],
      homeBased: [0, []],
    });

  }

  ngOnInit(): void {
    this.returnUrl = "/user/profil/"+this.authService.userValue?.idUser;
  }

  get f() { return this.catalogForm.controls; }

  changePicture(event:any){
    const pictureLink = event.target.value;
    console.log('pictureLink :>> ', pictureLink);
    if(pictureLink){
      
      this.pictureLink = pictureLink ;
      this.catalogForm.patchValue({ imagesCatalog : pictureLink });
    }
    else
      this.pictureLink = DEFAULT_PICTURE_LINK;
  }
  
  addCatalog() {

    const titleCatalog = this.catalogForm.value['titleCatalog'];
    const addressCatalog = this.catalogForm.value['addressCatalog'];
    const latitude = this.catalogForm.value['latitude'];
    const longitude = this.catalogForm.value['longitude'];
    const imagesCatalog = this.catalogForm.value['imagesCatalog'];
    const activateCatalog = this.catalogForm.value['activateCatalog'];
    const homeBased = this.catalogForm.value['homeBased'];
    
    console.log('titleCatalog : ', titleCatalog);
    console.log('addressCatalog : ', addressCatalog);
    console.log('latitude : ', latitude);
    console.log('longitude : ', longitude);
    console.log('imagesCatalog',imagesCatalog);
    console.log('activateCatalog',activateCatalog);
    console.log('homeBased',homeBased);

    this.submitted = true;

    // stop here if form is invalid
    if (this.catalogForm.invalid) {
      return;
    }

    this.loading = true;

    const catalog: CatalogCreator = { 
      titleCatalog, 
      addressCatalog, 
      latitude, 
      longitude,
      imagesCatalog,
      activateCatalog,
      homeBased };

    this.catalogService.create( catalog)
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
