import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
@Injectable()
export class MagazzinoService {
    constructor(private http:Http) { }
    // Uses http.get() to load a single JSON file
    getAllMagazzini() {
      return this.http.get('http://localhost:53236/Magazzino/GetMagazzini').map((res:Response) => res.json());
    }
    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getBooksAndMovies() {
      return Observable.forkJoin(
       // this.http.get('/app/books.json').map((res:Response) => res.json()),
       // this.http.get('/app/movies.json').map((res:Response) => res.json())
      );
    }
  
  createMagazzino(magazzino) {
    let headers = new Headers({ 'Accept': 'application/json',
    'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(magazzino);
    console.log(body);
    return this.http.post('http://localhost:53236/Magazzino/InsertMagazzino', body , options ).map((res: Response) => res.json());
  }
  updateTipoQta(tipoQta) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(tipoQta);
    return this.http.put('http://localhost:53236/TipoQuantita/UpdateQta' + tipoQta, body, options ).map((res: Response) => res.json());
  }
  deleteTipoQta(tipoQta) {
    return this.http.delete('http://localhost:53236/TipoQuantita/DeleteQta' + tipoQta);
  }
}