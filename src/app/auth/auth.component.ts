import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  errorRes: string | null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(!form.valid){
      return;
    }
    const username = form.value.username;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    authObs = this.authService.logIn(username, password);

    authObs.subscribe(
      resData =>{
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/']);
    }, errorMessage => {
      console.log(errorMessage);
      this.errorRes = errorMessage;
      this.isLoading = false;
    });

    form.reset();
  }

  onHandleError() {
    this.errorRes = null;
  }

}
