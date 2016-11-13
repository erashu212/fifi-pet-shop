import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/share'

import { Injectable } from '@angular/core'

import { Http, Headers, Request, Response, URLSearchParams, BrowserXhr } from '@angular/http';

declare const process: any,  window: any;

export function httpRequest(http: Http, options: any): Observable<any> {
  if (options.body) {
    if (typeof options.body !== 'string') {
      options.body = JSON.stringify(options.body);
    }
  }
  // just a hack to avoid breaking changes in rc5+
  else {
    options.body = '';
  }

  if (options.search) {
    if (typeof options.search !== 'string') {
      options.search = new URLSearchParams(options.search);
    }
  }

  if (!options.headers) {
    options.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': `*`,
      'CORS': `${process.env.CORS}`
    });
  }
  options.url = `${window.apiServer + options.url}`;

  return http.request(new Request(options))
    .map((res: Response) => {
      return res.json()
    }).share();
}

@Injectable()
export class CORSBrowserXHr extends BrowserXhr {
  build(): any {
    var x: any = super.build();
    x[ 'withCredentials' ] = true;
    return x;
  }
}