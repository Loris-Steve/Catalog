import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public translate: TranslateService) { 
    translate.addLangs(['fr','en']);
    translate.setDefaultLang('fr');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr/) ? browserLang : 'fr');
  }

  ngOnInit(): void {
  }

}
