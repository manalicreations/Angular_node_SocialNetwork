import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  userDetails = {
    fname: "",
    lname: "",
    dob: "",
    email: "",
    phone: 0,
    gender: ""
  }
  isSave = false
  userAlive: string;
  myForm: FormGroup;

  constructor(private user: UserService, private auth: AuthService, private router: Router) {

    this.myForm = new FormGroup(
      {
        'firstname': new FormControl('', Validators.required),
        'lastname': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required),
        'confirmPassword': new FormControl('', Validators.required),
        'email': new FormControl('', [Validators.required, this.asyncValidator.bind(this)]),
        'number': new FormControl('', Validators.required),
        'birthday': new FormControl('', Validators.required),
        'gender': new FormControl('', Validators.required),
      }, { validators: this.confirmPassValidator }
    );

    this.fetchUserData()
  }

  fetchUserData() {
    this.user.userDetails.subscribe(data => {
      this.userDetails = data

      this.myForm.setValue({
        firstname: data.fname,
        lastname: data.lname,
        password: "",
        confirmPassword: "",
        email: data.email,
        number: data.phone,
        birthday: data.dob,
        gender: data.gender[0].toUpperCase() + data.gender.slice(1).toLocaleLowerCase()
      })
    })
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
    if (this.userDetails.email === control.value) return null

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

  changeSave() {
    this.isSave = !this.isSave
  }

  update(form) {
    this.user.updateUser(this.myForm.value.firstname, this.myForm.value.lastname, this.myForm.value.email, this.myForm.value.password, this.myForm.value.number, this.myForm.value.gender, this.myForm.value.birthday)
      .subscribe(res => {

        if (res.body.success) {
          console.log("data updated")
          this.user.getUser(this.userDetails.email).subscribe(data => {
            this.user.setUserDetails(data.result)
          })
          this.isSave = !this.isSave
        }

      })

  }
}