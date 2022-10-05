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
    private tokenExpiration: any;

    constructor(private http: HttpClient, private router: Router){}

    autoLogin(){
        const userData: {email:string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if(loadedUser.token){
            this.user.next(loadedUser);
            const tokenExpiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); // Expiring date in miliseconds minus current time in miliseconds
            this.autologOut(tokenExpiration);
        }
    }

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACqMPe7bIGBYKE1jDGamrOlAZifBm0jhM',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autologOut(expirationDuration: number){
        this.tokenExpiration = setTimeout(() => {
            this.logOut();
        }, expirationDuration);  // To test change expirationDuration for a number. i.e 3000 (3 seconds)
    }

    logOut(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpiration){
            clearTimeout(this.tokenExpiration)
        }
        this.tokenExpiration = null;
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
        this.autologOut(expiresIn *1000)    // expiresIn is in seconds and autologout in miliseconds
        localStorage.setItem('userData', JSON.stringify(user));
      }

    private handleError ( errorRes : HttpErrorResponse ) {
        let errorMessage = 'An unknown error ocurred!';
        if (!errorRes.error || !errorRes.error.error){
            return throwError(() => errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'INVALID_PASSWORD': //We can add easily more common errors but for security better dont give more hints
              errorMessage = 'Wrong username/password/OTP!';
              break;
        }
        return throwError(() => errorMessage);
    }

}




