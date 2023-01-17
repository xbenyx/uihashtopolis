import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { UsersService } from '../core/_services/users/users.service';
import { ValidationService } from '../core/_services/validation.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  isLoading = false;
  // We need to access groups using the API
  groups = ['Admin', 'Standard User'];
  createForm: FormGroup;
  // We need an array uf user names, so we do not create a duplicate name.
  usedUserNames = ['Admin', 'Guest'];

  constructor(
     private route:ActivatedRoute,
     private router: Router,
     private usersService: UsersService
     ){}

  ngOnInit(): void {
    this.createForm = new FormGroup({
      // 'username': new FormControl(null, [Validators.required, this.checkUserNameExist.bind(this)]),
      'username': new FormControl('', Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]), //Check ValidationService.emailValidator
      'rightGroupId': new FormControl(1),
      'passwordHash': new FormControl(''),
      'passwordSalt': new FormControl(''),
      'isValid': new FormControl(true),
      'isComputedPassword': new FormControl(true),
      'lastLoginDate': new FormControl(0),
      'registeredSince': new FormControl(0),
      'sessionLifetime': new FormControl(0),
      'yubikey': new FormControl(''),
      'otp1': new FormControl(''),
      'otp2': new FormControl(''),
      'otp3': new FormControl(''),
      'otp4': new FormControl(''),
    });

  }

  onSubmit(){
    if (this.createForm.valid) {

      this.isLoading = true;

      this.usersService.createUser(this.createForm.value).subscribe((user: any) => {
        const response = user;
        console.log(response);
        this.isLoading = false;
          Swal.fire({
            title: "Good job!",
            text: "New User created!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['users/all-users']);
        },
        errorMessage => {
          // check error status code is 500, if so, do some action
          Swal.fire({
            title: "Error!",
            text: "User was not created, please try again!",
            icon: "warning",
            showConfirmButton: true
          });
        }
      );
    }
  }

  checkUserNameExist(control: FormControl): {[s: string]: boolean}{
    if(this.usedUserNames.indexOf(control.value) !== -1){
      return {'nameIsUsed': true};
    }
    return null as any;
  }




}
