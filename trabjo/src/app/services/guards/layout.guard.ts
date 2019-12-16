import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutGuard implements CanActivate {

  constructor(private router: Router, private users: UserService) { }

  userData: any
  canActivate(): boolean {
    this.userData = localStorage.getItem('web_user')
    if (this.users.getUserToken) {
      return true;
    }
    localStorage.clear();
    this.router.navigate(['/login']);
    return false;
  }

}
