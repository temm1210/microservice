
import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class LoginService {

    loginInfo: EventEmitter<any> = new EventEmitter();
    isLogin:boolean = localStorage.getItem('user') ? true : false;

    constructor(private http: HttpClient){}
    
    login(user): Observable<any> {
        return this.http.post('/member/signin', user);
    }

    join(user): Observable<any> {
        return this.http.post('/member/signup', user)
    }

    logOut() {
        this.isLogin= false;
        localStorage.removeItem('user');
        localStorage.removeItem('jwtToken');
    }

    isUser(){
        return localStorage.getItem('user') ? true: false;
    }
}
