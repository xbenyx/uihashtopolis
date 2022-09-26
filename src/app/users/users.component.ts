import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  groups = ['Admin', 'Standard User'];
  signupForm: FormGroup;

  // constructor() { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'group': new FormControl(null, [Validators.required])
    });
  }

  onSubmit(): void{
    if (this.signupForm.valid) {
    console.log(this.signupForm);
    // form.reset();
  }
  }
}
