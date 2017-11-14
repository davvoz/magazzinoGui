import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
@Injectable()
export class ProdottoQtaService {
    constructor(private http:Http) { }
    getAllProdottiQta() {
      return this.http.get('http://localhost:53236/ProdottoQta/GetAllProdottiQta').map((res:Response) => res.json());
    }
    updateProduct(prod) {
      let headers = new Headers({  'Accept': 'application/json',
      'Content-Type': 'application/json'  });
      
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(prod);
      
      return this.http.put('http://localhost:53236/ProdottoQta/UpdateProdottoQta' , body, options ).map((res: Response) => res.json());
    }
    createProdQta(tipoProdQta) {
    
      let headers = new Headers({ 'Accept': 'application/json',
      'Content-Type': 'application/json' ,
     });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(tipoProdQta);
      return this.http.post('http://localhost:53236/ProdottoQta/InsertProdottoQta', body, options ).map((res: Response) => res.json());
      
    }
    
}