import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

// services
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private loader: LoaderService
  ) { }

  /**
   * @method (get http request)
   * @param url (api url)
   * @param data (all search params)
   * @param backGroundUrl (don't want to show loader for any request pass true)
   */
  getData(url: string, data?: any, backGroundUrl?: boolean): Observable<any> {
    const searchParams = this.appendParams(data);
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    if (backGroundUrl) {
      this.loader.backGroundUrls.push(apiUrl);
    }
    return this.http.get(apiUrl, { params: searchParams })
      .pipe(map((response: any) => {
        return response;
      }));
  }

  /**
   * @method (post http request)
   * @param url (api url)
   * @param data (data which we have to pass to server)
   */
  postData(url: string, data, formData?: boolean, backGroundUrl?: boolean) {
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    if (backGroundUrl) {
      this.loader.backGroundUrls.push(apiUrl);
    }
    return this.http.post(apiUrl, postData)
      .pipe(map((response: any) => {
        console.log("responseresponse",response)
        return response;
      }));
  }

  /**
   * @method (put http request)
   * @param url (api url)
   * @param data (data which we have to pass to server)
   */
  putData(url: string, data, formData?: boolean) {
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.put(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  /**
   * @method (patch http request)
   * @param url (api url)
   * @param data (data which we have to pass to server)
   */
  patchData(url: string, data, formData?: boolean) {
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    const postData = !formData ? data : this.appendFormData(data);
    return this.http.patch(apiUrl, postData)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  /**
   * @method (delete http request)
   * @param url (api url)
   */
  deleteData(url: string) {
    const apiUrl = `${environment.apiBaseUrl}${url}`;
    return this.http.delete(apiUrl)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  /**
   * @method (append formdata)
   * @param myFormData (pass which you want to make formdata type)
   */
  appendFormData(myFormData: { [x: string]: any; }): FormData {
    const fd = new FormData();
    for (const key of Object.keys(myFormData)) {
      fd.append(key, myFormData[key]);
    }
    return fd;
  }

  /**
   * @method (append params)
   * @param myParams (pass data which you want to make http params)
   */
  appendParams(myParams: { [x: string]: any; }): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(myParams)) {
      // if (data[key] || key == 'skip')
      params = params.append(key, myParams[key]);
    }
    return params;
  }

}
