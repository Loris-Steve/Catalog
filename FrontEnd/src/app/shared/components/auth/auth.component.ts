import { Injectable, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthGuard implements OnInit {

  constructor(private permissions: Permissions, private authService: AuthService) {}

  canActivate() {
    const currentUser = this.authService.getCurrentUser();
    if(Object.keys(currentUser).length > 0) {
      return true;
    }
    return false
  }
  
  ngOnInit(): void {
  }

}
