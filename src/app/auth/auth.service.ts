import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient){}

    logIn(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAsz_11A7UhOebfXwYbwHUg2qpVxy5BZg0',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        );
    }
}




