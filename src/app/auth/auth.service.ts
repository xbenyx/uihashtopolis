import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject,Subject, throwError, map, Observable, Observer  } from 'rxjs';
import { User } from './user.model';
import { Data, Router } from "@angular/router";
import { Configuration } from '../service/configuration';

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

// export interface AuthResponseData {
//   token: string,
//   expires: string,
// }

@Injectable({providedIn: 'root'})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    private tokenExpiration: any;
    private endpoint = Configuration.BASE_URL_APIV1 + '/auth/token';

    constructor(private http: HttpClient, private router: Router){

    }

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

    // autoLogin(){
    //     const userData: {email:string, id: string, _token: string, _expires: string} = JSON.parse(localStorage.getItem('userData'));
    //     if(!userData){
    //         return;
    //     }

    //     const loadedUser = new User(userData._token, new Date(userData._expires));

    //     if(loadedUser.token){
    //         this.user.next(loadedUser);
    //         const tokenExpiration = new Date(userData._expires).getTime() - new Date().getTime(); // Expiring date in miliseconds minus current time in miliseconds
    //         this.autologOut(tokenExpiration);
    //     }
    // }

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

    // Working Example using Fetch
    // logIn(username: string, password: string){
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Basic "+ window.btoa(username + ':' + password));

    //     fetch(this.endpoint, {method: 'POST',headers: myHeaders})
    //       .then(resData => {
    //         let data = resData.json();
    //         console.log(data);
    //                 // this.handleAuthentication(resData['token'], resData['expires']);
    //         })
    //       .catch(error => console.log('error', error));
    //  }

    // logIn(username: string, password: string){
    //     // let headers = new HttpHeaders().set('Content-Type', 'application/json');
    //     // headers = headers.set('Authorization', "Basic "+ window.btoa(username + ':' + password));

    //     // const httpOptions = {
    //     //   headers: headers,
    //     //   withCredentials: false
    //     // };

    //     // let headerss = {
    //     //   'Content-Type': 'text/html; charset=UTF-8',
    //     //   'Authorization': "Basic "+ window.btoa(username + ':' + password)
    //     // }

    //     // const httpOptionss = {
    //     //   headers: headerss
    //     //   // ,withCredentials: true
    //     // };

    //     let headers = new HttpHeaders({
    //       'Accept'       :'*/*',
    //       'Content-Type' :'text/plain'
    //     });

    //     let formData = {
    //       username      : 'root',
    //       password       : 'hashtopolis'
    //     }

    //     return this.http.post<AuthResponseData>(
    //       this.endpoint,
    //       // httpOptionss
    //       formData,
    //     {headers: headers},
    //     ).subscribe(
    //         resData =>{
    //         console.log(resData);
    //       })
    //     // .pipe(catchError(this.handleError), tap(resData => {
    //     //     console.log(resData);
    //     // }));
    // }

    // logIn(username: string, password: string){
    //   var xhr = new XMLHttpRequest();
    //   // xhr.withCredentials = false;

    //   xhr.addEventListener("readystatechange", function() {
    //     if(this.readyState === 4) {
    //       console.log(this.responseText);
    //     }
    //   });

    //   let pass = window.btoa('root' + ':' + 'hashtopolis');

    //   xhr.open("POST", "http://localhost:8080/api/v2/auth/token");
    //   xhr.setRequestHeader("Authorization", "Basic "+ pass);

    //   xhr.send();
    //  }


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

    // private handleAuthentication(token: string, expires: number) {
    //     const expirationDate = new Date(new Date().getTime() + expires * 1000);
    //     const user = new User(token, expirationDate);
    //     this.user.next(user);
    //     this.autologOut(expires *1000)    // expiresIn is in seconds and autologout in miliseconds
    //     localStorage.setItem('userData', JSON.stringify(user));
    //   }

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


// //
// Section Using Http Authentification (We changed Auth method to use fetch instead of Xhr)
// //


// user = new BehaviorSubject<User>(null);
// private tokenExpiration: any;
// private endpoint = Configuration.BASE_URL_APIV1 + '/auth/token';

// constructor(private http: HttpClient, private router: Router){}

// autoLogin(){
//     const userData: {email:string, id: string, _token: string, _tokenExpirationDate: string} = JSON.parse(localStorage.getItem('userData'));
//     if(!userData){
//         return;
//     }

//     const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

//     if(loadedUser.token){
//         this.user.next(loadedUser);
//         const tokenExpiration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime(); // Expiring date in miliseconds minus current time in miliseconds
//         this.autologOut(tokenExpiration);
//     }
// }

// logIn(email: string, password: string){
//     return this.http.post<AuthResponseData>(
//         'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyACqMPe7bIGBYKE1jDGamrOlAZifBm0jhM',
//         {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         }
//     ).pipe(catchError(this.handleError), tap(resData => {
//         this.handleAuthentication(resData.email,resData.localId, resData.idToken, +resData.expiresIn);
//     }));
// }

// autologOut(expirationDuration: number){
//     this.tokenExpiration = setTimeout(() => {
//         this.logOut();
//     }, expirationDuration);  // To test change expirationDuration for a number. i.e 3000 (3 seconds)
// }

// logOut(){
//     this.user.next(null);
//     this.router.navigate(['/auth']);
//     localStorage.removeItem('userData');
//     if(this.tokenExpiration){
//         clearTimeout(this.tokenExpiration)
//     }
//     this.tokenExpiration = null;
// }

// private handleAuthentication(
//     email: string,
//     userId: string,
//     token: string,
//     expiresIn: number
//   ) {
//     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
//     const user = new User(email, userId, token, expirationDate);
//     this.user.next(user);
//     this.autologOut(expiresIn *1000)    // expiresIn is in seconds and autologout in miliseconds
//     localStorage.setItem('userData', JSON.stringify(user));
//   }

// private handleError ( errorRes : HttpErrorResponse ) {
//     let errorMessage = 'An unknown error ocurred!';
//     if (!errorRes.error || !errorRes.error.error){
//         return throwError(() => errorMessage);
//     }
//     switch(errorRes.error.error.message){
//         case 'INVALID_PASSWORD': //We can add easily more common errors but for security better dont give more hints
//           errorMessage = 'Wrong username/password/OTP!';
//           break;
//     }
//     return throwError(() => errorMessage);
// }



