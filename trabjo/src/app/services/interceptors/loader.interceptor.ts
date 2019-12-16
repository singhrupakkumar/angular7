import { LoaderService } from './../../services/loader/loader.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const index = this.loader.backGroundUrls.indexOf(req.url.toString());

    if (index < 0) {
      this.requests.push(req);
      this.loader.show();
    } else {
      this.loader.backGroundUrls.splice(index, 1);
    }

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.removeRequest(req);
      }
    }, (err: any) => {
      this.removeRequest(req);
    }));
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    this.requests.splice(i, 1);
    if (this.requests.length === 0) {
      this.loader.hide();
    }
  }

}
