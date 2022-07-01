import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { UserRole } from 'src/app/shared/enums/userRoles.enum';
import { AuthService } from 'src/app/shared/services/auth.service';

const DEFAULT_PHOTO_LINK = "https://media.istockphoto.com/vectors/default-avatar-profile-icon-vector-vector-id1337144146?b=1&k=20&m=1337144146&s=170667a&w=0&h=ys-RUZbXzQ-FQdLstHeWshI4ViJuEhyEa4AzQNQ0rFI=";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  loading = false;
  submitted = false;
  returnUrl: string = '/search';
  error = '';

  role1 = UserRole.User
  role2 = UserRole.Professional

  photoLink : string = DEFAULT_PHOTO_LINK;

  public updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {


    this.updateForm = this.fb.group({
      photo: ['', []],
      phoneUser: ['', []],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
      role: [this.role1, [Validators.required]],
    }, { validators: this.checkPasswords });


  }

  changePhoto(event:any){
    const photoLink = event.target.value;
    console.log('photoLink :>> ', photoLink);
    this.photoLink = photoLink ? photoLink : DEFAULT_PHOTO_LINK;
  }

  checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirm_password')?.value
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
  }

  get f() { return this.updateForm.controls; }

  onSubmit() {

    const photo = this.updateForm.value['photo'];
    const phoneUser = this.updateForm.value['phoneUser'];
    const firstName = this.updateForm.value['firstName'];// API didn't ask firstName
    const lastName = this.updateForm.value['lastName'];
    const email = this.updateForm.value['email'];
    const password = this.updateForm.value['password'];
    const role = this.updateForm.value['role'];

    console.log('photo : ', photo);
    console.log('phoneUser : ', phoneUser);
    console.log('firstName : ', firstName);
    console.log('lastName : ', lastName);
    console.log('email : ', email);
    console.log('password : ', password);
    console.log('confirm_password : ', this.updateForm.value['confirm_password']);
    console.log('role : ', role);

    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
      console.log("Invalide ",this.updateForm.invalid.valueOf());
      return;
    }

    this.loading = true;
    this.authService.register(
      photo, firstName, lastName, email, password, role, phoneUser
    )
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          switch (error.status) {
            case 400:
              this.error = error?.error?.message; // erreur serveur
              break;
            case 401:
              this.error = error?.error?.message; // erreur serveur
              break;
            case 403:
              this.error = error?.error?.message; // erreur serveur
              break;
            default:
              this.error = "badRequest"
              break
          }

          this.loading = false;
        });
  }
}
