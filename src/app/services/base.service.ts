import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppSettings } from '../app.settings';

@Injectable()
export class BaseService {
  static apiUrl: string = AppSettings.API_ENDPOINT;
  static filesUrl: string = AppSettings.FILES_PATH;
  
  constructor(protected http: Http) { 

  }

  protected extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  protected handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
