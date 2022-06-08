import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserRole } from 'src/app/shared/enums/userRoles.enum';
import { AuthService } from 'src/app/shared/services/auth.service';
/* 
type FormErrors = { 
  photo: string, firstName: string, lastName: string, email: string,
   password: string, consfirm_password: string, role: UserRole };
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string = '/search';
  error = '';

  role1 = UserRole.User
  role2 = UserRole.Professional

  public registerForm: FormGroup ;
/*   public formErrors: FormErrors = {
    'photo': '',
    'firstName': '',
    'lastName': '',
    'email': '',
    'password': '',
    'consfirm_password': '',
    'role': UserRole.User
  };
 */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 

    
    this.registerForm = this.fb.group({
      photo: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required]],
      consfirm_password: ['',[Validators.required]],
      role: [this.role1,[Validators.required]],
    }, { validators: this.checkPasswords });

    
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => { 
    let pass = group.get('password')?.value;
    let confirmPass = group.get('consfirm_password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }
  
  ngOnInit(): void {
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {

    const photo = this.registerForm.value['photo'];
    const firstName = this.registerForm.value['firstName'];// API didn't ask firstName
    const lastName = this.registerForm.value['lastName'];
    const email = this.registerForm.value['email'];
    const password = this.registerForm.value['password'];
    const role = this.registerForm.value['role'];

    console.log('photo : ', photo);
    console.log('firstName : ', firstName);
    console.log('lastName : ', lastName);
    console.log('email : ', email);
    console.log('password : ', password);
    console.log('consfirm_password : ', this.registerForm.value['consfirm_password']);
    console.log('role : ', role);

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.register(
      photo, firstName, lastName, email, password, role
    )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          switch (error.status) {
            case 400:
              this.error = "badRequest"
              break;
            default:
              this.error = error?.error?.message; // erreur serveur
              break
          }

          this.loading = false;
        });
  }


}
