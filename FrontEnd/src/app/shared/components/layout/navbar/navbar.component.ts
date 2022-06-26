import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User = <User>{};

  constructor(public translate: TranslateService,
    public authService: AuthService
    ) {
      
    translate.addLangs(['fr','en']);
    translate.setDefaultLang('fr');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|fr/) ? browserLang : 'fr');

    this.authService.user.subscribe(user => this.user  = user || this.user)

  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout('/search');
  }

}
