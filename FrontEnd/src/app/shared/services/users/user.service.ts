import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

const link = "http://localhost:4000/api/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  loading: boolean = false;

  error: boolean = false;
  
  constructor(private router: Router, private httpClient: HttpClient ) { }

 /*  register(photo: string,firstName: string,lastName: string,
    email: string,password: string,role: UserRole): void {

      this.httpClient.get<User>(link + 'users/register').subscribe((response:User) => { 
         //Next callback
          console.log('response received')
          console.log(response);
            //Ajout d'un objet dans la mémoire de l'ordinateur
            //localStorage.setItem('userItem', response);
            
            //Récupération de l'objet
            //user:string = localStorage.getItem('user');*
        },
        (error) => {  
          this.loading = false;
          this.error = true;
        //   switch (error.status) {
        //     case 401:
        //         break;
        //     case 403: 
        //         break;
        // }

    });

  } */
}
