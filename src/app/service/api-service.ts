import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';

// npm install rxjs@6 rxjs-compat@6 --save
@Injectable()
export class ApiService {
    constructor(private _http: Http, private http: HttpClient) { }
    private URL_IMG = 'api/Image/UploadImage';
    CallAllService(_apiUrl: string) {
        return this._http.post(_apiUrl, null, null).map((data: Response) => data.json());
    }
    CallByResquestService(_apiUrl: string, request: any) {
        return this._http.post(_apiUrl, request, null).map((data: Response) => data.json());
    }
    postFile(fileToUpload: File) {
        const formData: FormData = new FormData();
        console.log('fileToUpload', fileToUpload);
        formData.append('file', fileToUpload, fileToUpload.name);
        const headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        return this.http.post(this.URL_IMG , formData);
      }
}
