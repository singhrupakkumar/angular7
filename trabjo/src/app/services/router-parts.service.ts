import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ActivatedRouteSnapshot, Params, PRIMARY_OUTLET } from '@angular/router';

interface IRoutePart {
  title: string;
  breadcrumb?: string;
  params?: Params;
  url: string;
  urlSegments: any[];
}

@Injectable({
  providedIn: 'root'
})
export class RoutePartsService implements OnInit {

  public routeParts: IRoutePart[];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  generateRouteParts(snapshot: ActivatedRouteSnapshot): IRoutePart[] {
    let routeParts = <IRoutePart[]>[];
    if (snapshot) {
      if (snapshot.firstChild) {
        routeParts = routeParts.concat(this.generateRouteParts(snapshot.firstChild));
      }
      if (snapshot.data['title'] && snapshot.url.length) {
        routeParts.push({
          title: snapshot.data['title'],
          breadcrumb: snapshot.data['breadcrumb'],
          url: snapshot.url[0].path,
          urlSegments: snapshot.url,
          params: snapshot.params
        });
      }
    }
    return routeParts;
  }

}
