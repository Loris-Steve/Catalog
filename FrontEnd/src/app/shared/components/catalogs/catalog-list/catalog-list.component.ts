import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Catalog } from 'src/app/shared/models/catalog.model';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  @Input() catalogs : Catalog[] = [];
  @Input() updateOption : boolean = false;
  
  // showDetailCatalog : boolean = false;
  // currentCatalogId: number | undefined ;
  // currentCatalog: Catalog = <Catalog>{};

  constructor(private route : Router) { }

  ngOnInit(): void {
    console.log('this.catalogs :>> ', this.catalogs);
  }


  showDetails= (catalogId : number) => {
    
    this.route.navigate(['/user/profil/2/'+catalogId]);
  }

}
