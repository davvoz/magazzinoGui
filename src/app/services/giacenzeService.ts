import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Rx";
@Injectable()
export class GiacenzeService {
    constructor(private http:Http) { }
    
    getProducts(magazzinoId) {
      return this.http.get('http://localhost:53236/GiacenzeProdotti/GetGiacenzeProdottiFromMagazzinoId/'+magazzinoId).map((res:Response) => res.json());
    }
    getAllGiacenze(){
      return this.http.get('http://localhost:53236/Giacenze/GetGiacenze').map((res:Response) => res.json());
    }
    updateProduct(giacenza) {
      let headers = new Headers({  'Accept': 'application/json',
      'Content-Type': 'application/json'  });
      
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(giacenza);
      
      return this.http.put('http://localhost:53236/Giacenze/UpdateGiacenza' , body, options ).map((res: Response) => res.json());
    }
    createGiacenza(giacenza) {
      let headers = new Headers({ 'Accept': 'application/json',
      'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let body = JSON.stringify(giacenza);
      console.log(body);
      return this.http.post('http://localhost:53236/Giacenze/InsertGiacenze', body , options ).map((res: Response) => res.json());
    }
}