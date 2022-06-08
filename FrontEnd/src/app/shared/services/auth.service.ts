import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user.model';

import { environment } from 'src/environments/environment.prod';
import { UserRole } from '../enums/userRoles.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private userSubject: BehaviorSubject<User | null>;
    public user: Observable<User| null>;
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
      const item: string | null = localStorage.getItem('currentUser');
        this.userSubject = new BehaviorSubject<User | null>(item != null ? JSON.parse(item) : item);
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User | null {
        return this.userSubject.value;
    }

    public get isAuth(): boolean {
      if(this.userSubject.value)
        return true;
      else
        return false;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.hostURL}users/login`, { email, password })
            .pipe(map(currentUser => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                //user.authdata = window.btoa(email + ':' + password);
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.userSubject.next(currentUser);
                return currentUser;
            }));
    }

    register(photo: string, firstName: string, lastName: string, email: string,
      password: string, role: UserRole) {
      return this.http.post<any>(`${environment.hostURL}users/register`, 
      { photo, firstName, lastName, email, password, role })
          .pipe(map(currentUser => {
              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
              //user.authdata = window.btoa(email + ':' + password);
              localStorage.setItem('currentUser', JSON.stringify(currentUser));
              this.userSubject.next(currentUser);
              return currentUser;
          }));
  }

    logout(returnTo : string) {
        // remove currentUser from local storage to log currentUser out
        localStorage.removeItem('currentUser');
        this.userSubject.next(null);
        this.router.navigate([returnTo || '/']);
    }
}
