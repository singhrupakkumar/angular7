import { MessageService } from '../message/message.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private message: MessageService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        tap(event => { }, error => {
          console.log("errorerrorerror",error)
          switch (error.status) {
            case 401:
              /********** Auto logout if 401 response returned from api **********/
              localStorage.clear();
              this.router.navigate(['/login']);
              this.message.alert('error', 'OOPS!', 'Sorry, your account has been logged in other device! Please login again to continue.');
              break;
            case 0 || 404:
              /********** If server dosent respond **********/
              this.message.alert('error', 'OOPS!', 'HTTP Error Response.');
              break;
            default:
              /********** Check for other serve-side errors **********/
              this.message.toast('error', error.error.message);
              break;
          }
        }));
  }

}
