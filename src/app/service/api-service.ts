import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

// npm install rxjs@6 rxjs-compat@6 --save
@Injectable()
export class ApiService {
    constructor(private _http: Http) { }

    CallAllService(_apiUrl: string) {
        return this._http.post(_apiUrl, null, null).map((data: Response) => data.json());
    }
    CallByResquestService(_apiUrl: string, request: any) {
        return this._http.post(_apiUrl, request, null).map((data: Response) => data.json());
    }
}
