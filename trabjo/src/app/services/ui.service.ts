import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private _location: Location) { }

  goBack() {
    this._location.back();
  }

  cal(page, limit, count) {
    if (page * limit <= count) {
      return page * limit;
    } else {
      return count;
    }
  }

}
