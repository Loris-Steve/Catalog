import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Catalog } from 'src/app/shared/models/catalog.model';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {

  @Input() catalogs : Catalog[] = [];
  @Input() updateOption : boolean = false;
  
  showDetailCatalog : boolean = false;
  currentCatalogId: number | undefined ;
  currentCatalog: Catalog = <Catalog>{};

  constructor() { }

  ngOnInit(): void {
    console.log('this.catalogs :>> ', this.catalogs);
  }

  setShowDetailCatalog(show:boolean){
    this.showDetailCatalog = show;
  }

  showDetails= (catalogId : number) => {
    console.log("detail",catalogId);
    this.currentCatalogId = catalogId;
    this.setShowDetailCatalog(true);
  }

}
