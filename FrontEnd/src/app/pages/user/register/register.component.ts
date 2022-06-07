import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type FormErrors = { 
  photo: string, firstName: string, lastName: string, email: string,
   password: string, consfirm_password: string, role: 'User' | 'Professionnel' };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  public registerForm: FormGroup ;
  public formErrors: FormErrors = {
    'photo': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'consfirm_password': '',
    'role': 'User'
  };

  constructor(
    private fb: FormBuilder
  ) { 

    this.registerForm = this.fb.group({
      photo: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      consfirm_password: ['',[Validators.required]],
      role: ['',[Validators.required]],
    });
/* 
    this.alertHistoryApiService.alerts$.subscribe(alerts => {
      this.alertTable = {
        ...this.alertTable,
        rows: alerts
      }
    });
 */
  }

  ngOnInit(): void {
  }

  onSubmit() {
    //console.log("registerForm.valid  : " + this.registerForm.valid)
    //console.log('lastName '+date + ' end date : '+this.registerForm.value['email']);

    // this.alerts = this.alertsServer.filter(alert => alert.creationDate >= this.registerForm.value['lastName'] && alert.creationDate <= this.registerForm.value['email'] && alert.role <= this.registerForm.value['role'])
    // this.authService.login(this.registerForm.value['lastName'], this.registerForm.value['email']);

    const photo = this.registerForm.value['photo'];
    const firstName = this.registerForm.value['firstName'];// API didn't ask firstName
    const lastName = this.registerForm.value['lastName'];
    const email = this.registerForm.value['email'];
    const password = this.registerForm.value['password'];
    const role = this.registerForm.value['role'];

    console.log('photo :>> ', photo);
    
     console.log('firstName :>> ', firstName);
     console.log('lastName :>> ', lastName);
     console.log('email :>> ', email);
     console.log('password :>> ', password);

    // this.alertHistoryApiService.loadAlerts(
    //   photo, role);

  }


}
