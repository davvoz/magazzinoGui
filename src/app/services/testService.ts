import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
@Injectable()
export class TestService {
    constructor(private http:Http) { }
    // Uses http.get() to load a single JSON file
    getTest() {
      return this.http.get('http://localhost:53236/Test/Get').map((res:Response) => res.json());
    }
}