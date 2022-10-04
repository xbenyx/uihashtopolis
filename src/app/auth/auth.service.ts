import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject,Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient, private router: Router){}

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsz_11A7UhOebfXwYbwHUg2qpVxy5BZg0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
      }


    private handleError ( errorRes : HttpErrorResponse ) {
        let errorMessage = 'An unknown error ocurred!';
        if (!errorRes.error || !errorRes.error.error){
            return throwError(() => errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'INVALID_PASSWORD': //We can add more common errors but for security better dont give more hints
              errorMessage = 'Wrong username/password/OTP!';
              break;
        }
        return throwError(() => errorMessage);
    }

}




