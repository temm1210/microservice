import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class LoginGuard implements CanActivate{

    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkIsUser();
    }

    checkIsUser(): boolean {
        if(localStorage.getItem('user')) return true;
        if(window.confirm('로그인이　필요한　서비스입니다．　로그인　하시겠습니까？')) this.router.navigate(['/login'])
        
        return false;
    }
}
