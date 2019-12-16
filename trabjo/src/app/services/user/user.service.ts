import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(
    // @Inject(LOCAL_STORAGE) private localStorage: any,
    private router: Router) {

    /********* Check JSON parse error on fetching currentUser from local storage **********/
    let _user: any = null;
    try {
      _user = JSON.parse(localStorage.getItem('web_user'));
    } catch (error) {
      if (error instanceof SyntaxError) this.removeUser();
    }
    this.currentUserSubject = new BehaviorSubject<any>(_user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /********* Get the current value of the logged in user **********/
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  /********* Get the current user token **********/
  public get getUserToken(): string {
    if (!!this.currentUserValue) return this.currentUserValue.accessToken;
  }

  /********* Set user in local storage **********/
  setUserLocalData(userData: any) {
    localStorage.setItem('web_user', JSON.stringify(userData));
    this.currentUserSubject.next(userData);
  }

  /********* Remove user from local storage **********/
  removeUser() {
    localStorage.removeItem('web_user');
    if (this.currentUserSubject) {
      this.currentUserSubject.next(null);
    }
  }

  /********* User Sign-Out **********/
  userSignOut() {
    this.removeUser();
    this.router.navigate(['/login']);
  }
}
