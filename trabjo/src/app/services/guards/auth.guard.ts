import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    userData : any
    constructor(protected router: Router, private users: UserService) { }

    canActivate() {
        console.log('this.users.getUserToken',this.users.getUserToken)
        if(this.users.getUserToken){
            return true;
        }
        this.router.navigate(['/homepage']);
        return false;
    }

}
