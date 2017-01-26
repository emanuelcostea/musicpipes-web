import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    let userObj = JSON.parse(localStorage.getItem('currentUser'));
    let token = userObj ? userObj.token : null;
    options.headers.set('Authorization', token);
    super(backend, options);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    let userObj = JSON.parse(localStorage.getItem('currentUser'));
    let token = userObj ? userObj.token : null;
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        options = { headers: new Headers() };
      }
      options.headers.set('Authorization', token);
    } else { // we have to add the token to the url object
      url.headers.set('Authorization', token);
    }
    return super.request(url, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}