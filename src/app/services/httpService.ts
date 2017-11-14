import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
@Injectable()
export class HttpService {
    constructor(private http:Http ) { }
    public root = "http://localhost:53236/";
    createHeadersAndOptions(el : any){
      let headers = new Headers({  'Accept': 'application/json',
      'Content-Type': 'application/json'  });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(el);
      return {
        headers : headers,
        options : options,
        body : body
      }
    }
    getFromId(elId , query ) {
      return this.http.get( this.root + query + elId).map((res:Response) => res.json());
    }
    getAll(query ){
      return this.http.get(this.root+ query).map((res:Response) => res.json());
    }
    update(el, query ) {
      let response = this.createHeadersAndOptions(el);
      return this.http.put(this.root+ query ,response.body, response.options ).map((res: Response) => res.json());
    }
    create(el, query ) {
      let response = this.createHeadersAndOptions(el);
      return this.http.post(this.root + query, response.body , response.options ).map((res: Response) => res.json());
    }
}