import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { MessageService } from '../service/message.service';
import 'rxjs/add/operator/shareReplay';
@Injectable()
export class HttpBaseService {
  constructor(private http: HttpClient, private _messageService: MessageService) { }

  subjectArr = new Subject<any>();
  httpPost(url: string, options: any, _headers?: any): Observable<any> {
    const myHeaders: Headers = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return this.httpForm(url, options, "application/json", _headers).shareReplay();
  }
  httpPostf(url: string, options: any): Observable<any> {
    // const myHeaders: Headers = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    let _headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' });

    return this.httpForm(url, options, "application/x-www-form-urlencoded", _headers);
  }
  private httpForm(url: string, options: any, type: string, _headers?: any): Observable<any> {

    const headers = new HttpHeaders().set("Content-Type", type);
    // for (const key in _headers) {
    //   headers.append(key, _headers[key]);
    // } 
    let subjectArr = new Subject<any>();
    this.http.post(url, options, { headers }).shareReplay().subscribe(res => {
      let jsonRes = res;//.json();
      if (jsonRes['StatusCode'] == 500) {
        // jsonRes = {StatusCode == 500, Data: jsonRes.Data}
        this._messageService.setMessage({ error: 'error', message: jsonRes['Data'] });
      }
      else if (jsonRes['StatusCode'] == 200) {
        jsonRes = JSON.parse(jsonRes['Data']);
      }
      return subjectArr.next(jsonRes);
    }, error => {
      this._messageService.setMessage({ error: 'error', message: error.statusText });
      return subjectArr.asObservable();
    });
    return subjectArr.asObservable();
  }
}
