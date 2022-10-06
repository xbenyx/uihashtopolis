import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../service/users/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // We need to access groups using the API
  groups = ['Admin', 'Standard User'];
  signupForm: FormGroup;
  // We need an array uf user names, so we do not create a duplicate name.
  usedUserNames = ['Admin', 'Guest'];

  constructor( private route:ActivatedRoute, private usersService: UsersService){}

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
      'username': new FormControl(null, [Validators.required, this.checkUserNameExist.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email])
       }),
      'group': new FormControl(null, [Validators.required])
    });


  }

  onSubmit(): void{
    if (this.signupForm.valid) {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  }

  checkUserNameExist(control: FormControl): {[s: string]: boolean}{
    if(this.usedUserNames.indexOf(control.value) !== -1){
      return {'nameIsUsed': true};
    }
    return null as any;
  }




}
