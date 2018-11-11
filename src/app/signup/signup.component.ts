import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

interface res {
  success: boolean,
  message: string,
  result: any
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  myForm: FormGroup;
  genders = ['male', 'female'];
  static Async: AuthService
  selectedFile: File
  uploadValue: number
  uploadedImageName: string

  constructor(private user: UserService,
    private auth: AuthService,
    private router: Router,
    private http: HttpClient) {

    this.myForm = new FormGroup(
      {
        'firstname': new FormControl('', Validators.required),
        'lastname': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, this.asyncValidator.bind(this)]),
        'number': new FormControl('', Validators.required),
        'birthday': new FormControl('', Validators.required),
        'gender': new FormControl('Male', Validators.required),
        'profilePic': new FormControl('', Validators.required),
      }, { validators: this.confirmPassValidator }
    );

    this.uploadValue = 0
  }

  onSubmit() {
    this.user.signUpUser(
      this.myForm.value.firstname,
      this.myForm.value.lastname,
      this.myForm.value.email,
      this.myForm.value.password,
      this.myForm.value.number,
      this.myForm.value.gender,
      this.myForm.value.birthday,
      this.uploadedImageName)
      .subscribe(res => {
        if (res.body.success)
          this.router.navigate(['/login'])
        else
          alert(res.body.message)
      });
  }

  confirmPassValidator(control: FormGroup): null | { invalid: boolean } {

    const pass = control.get('password');
    const cpass = control.get('confirmPassword')

    if (pass.value !== cpass.value) {
      cpass.setErrors({ notUnique: false })
    }
    else return null;
  }

  asyncValidator(control: FormControl) {
    return this.auth.isUserExists(control.value).subscribe(res => {
      if (res.status == 200 && !res.body.success) {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if (reg.test(control.value) == true) {
          control.setErrors(null)
        }
      }
      return res.body.success ? null : { emailTaken: true };
    }
    );
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0]
  }
  uploadFile() {
    this.uploadValue = 0
    const fd = new FormData();

    if (this.selectedFile !== undefined) {


      fd.append('file', this.selectedFile, this.selectedFile.name)
      this.http.post<res>('/api/upload/uploadOneFile', fd, { reportProgress: true, observe: 'response' })
        .subscribe(data => {

          if (data.body.success) {

            this.uploadValue = 100
            this.uploadedImageName = data.body.result

          }
        });

      let int=setInterval(() => {
        if (this.uploadValue < 100) {
          this.uploadValue = this.uploadValue + 1
        }
      }, 20)

      clearInterval(int);

    }

  }




}
