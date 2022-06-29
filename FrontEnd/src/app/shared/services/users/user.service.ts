import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../../models/user.model';

const link = "http://localhost:4000/api/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new BehaviorSubject<User | null>(null);
  user$ = this.user.asObservable();

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  private error = new BehaviorSubject<string>('');
  error$ = this.error.asObservable();
  
  constructor(private router: Router, private httpClient: HttpClient ) { }

  
  getUserById(userId: number): void {

    this.httpClient.get<User>(`${environment.hostURL}users/${userId}`) 
      .subscribe(
      data => {
        console.log("data", data);
        this.user.next(data);
      },
      error => {
        switch (error.status) {
          case 400:
            this.error.next("badRequest");
            break;
          default:
            this.error.next(error?.error?.message); // erreur serveur
            break
        }

      },
      () => this.loading.next(false) // finally
    );
    }
}
