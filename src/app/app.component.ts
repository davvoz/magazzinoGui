import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpService} from'./services/httpService';
import { Observable } from "rxjs/Observable";
import { Modal } from 'angular2-modal/plugins/bootstrap';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //Public property 
    public title = 'magazzino';
    public magazzini:any;
    public misure:any;
    public prodotti:any;
    public prodottiQta:any;
    public giacenze:any;
    public test:any;
    public visibility = ['block','none','none','none','none','none','none','none','none','none','none','none'];
    public quantita : number[] = [];
    public giacenza:any;
    public visibilityFoto = ['block','none'];
    public styleWarning : string[] =['none'];
    public selectedMisura:string='';
    public idMisuraModel:number=0;
    public misuraInMisuraModel:string='';
    public misura:any={};
    public testText:string='';
    public prodQtaMisuraModel:string='';
    public prodQtaNomeModel:string='';
    public prodQta:any={};
    public prodQtaImg64:any;
    public magazzinoNomeModel:string='';
    public magazzinoLocazioneModel:string='';
    public magazzinoIdModel:number;
    public magazzino:any={};
    public prodottiMagazzino:any=[];
    public prodIdModel:number;
    public prodNomeModel:string;
    public prodTipologiaQtaModelString:string;
    public prodTipologiaQtaModelId:number;
    public prodModel:any;
    public prodNomeTitleModel:string;
    public prodImmagine:any;
    public prodImmagineOld:any;
    public prodQuantita :number[]=[];
    public prodEnableConfirm:string[]=[];
    private immagineModificata = false;
    public enableSaveAll:string = "none";
    public contenutoModal:any;
    public newGiacenza:any;
    public newGiacenzaInserimento:Date ;
    public newGiacenzaScadenza:Date;
    public newGiacenzaTipoQtaProdotto:string="Quantità";
    public newGiacenzaIdProdotto:any="Nessun ordine inserito";
    public newGiacenzaNomeMagazzino:string;
    public newGiacenzaNomeProdotto:string;
    public newGiacenzaQuantita:number;
    public inizia:Boolean=true; 
    public files : File;
    public logo:any;
    public fotos:any[];
  constructor(
   private serviceQta: HttpService , 
   private serviceMagazzino: HttpService , 
   private serviceProdQta: HttpService,
   private serviceTest:HttpService,
   private serviceGiacenze:HttpService,
   public modal: Modal
  ){ } 
  ngOnInit(): void {
    this.allGet();
    this.inizia ? this.changeVisibility(1) : this.changeVisibility(2);
    this.inizializzaOggi();
    }
  
  allGet(){
    this.getMisure();
    this.getMagazzini();
    this.getProdottiQta();
    this.getGiacenze();
    }
  inizializzaOggi(){
   let today = new Date();
   this.newGiacenzaInserimento = today;
    }  
  onClick(something:any,titolo:string) {
      this.modal.alert()
          .size('lg')
          .showClose(true)
          .title(titolo)
          .body('CONTENT :<br>'+something)
          .open();
      }
  getTest() {
      this.serviceTest.getAll("Test/Get").subscribe(
        data => { this.test = data},
        err => console.error(err),
        () => console.log('done loading test')
      );
    }
 
  updateGiacenza(giac,index) {
    let convertGiac = {
      Id :giac.Id,
      ProdottoId : giac.ProdottoId ,
      MagazzinoId : giac.MagazzinoId,
      Scadenza :giac.Scadenza,
      Inserimento:giac.Inserimento,
      Quantita:this.prodQuantita[index]
    };
      this.serviceGiacenze.update(convertGiac,"Giacenze/UpdateGiacenza").subscribe(
        data => {
           this.giacenza = data ; 
           this.onClick(JSON.stringify(convertGiac),'Giacenza aggiornata');
           this.prodEnableConfirm[index] ="none";
           this.styleWarning[index] = "none";
           console.log(this.styleWarning);
           let count=0;
           for(let i = 0; i < this.styleWarning.length;i++){
              if(this.styleWarning[i] === "yellow"){
                count++;
              }
           }
           if(count === 0){
             this.enableSaveAll = "none";
           }else{
             this.enableSaveAll = "block";
           }
        },
        err =>{ this.onClick(err,'Errore');console.error(err)},
        () => console.log('done giacenza update')
      );

    }
  updateProdotto() {
   if(this.immagineModificata){
    this.prodModel = {
      Id:this.prodIdModel,
      ProdottoNome:this.prodNomeModel,
      TipologiaQtaId:this.prodTipologiaQtaModelId,
      TipologiaQta : this.prodTipologiaQtaModelString,
      Immagine :this.prodQtaImg64
    }
   }else{
    this.prodModel = {
      Id:this.prodIdModel,
      ProdottoNome:this.prodNomeModel,
      TipologiaQtaId:this.prodTipologiaQtaModelId,
      TipologiaQta : this.prodTipologiaQtaModelString,
      Immagine :this.prodImmagineOld
    }
   }
   this.inizia = false ; 
    this.serviceProdQta.update(this.prodModel,"ProdottoQta/UpdateProdottoQta").subscribe(
      data => { 
        this.onClick(JSON.stringify( this.prodModel),'Prodotto aggiornato');
        this.ngOnInit()},
      err =>{ this.onClick(err,'Errore');console.error(err)},
      () => console.log('done giacenza update')
    );

    }
  getProductsFromMagazzino(magazzinoId){
    this.serviceGiacenze.getFromId(magazzinoId,"GiacenzeProdotti/GetGiacenzeProdottiFromMagazzinoId/").subscribe(
      data => { 
        this.prodottiMagazzino = data ; 
        this.quantita = data.Quantita;
        for(let i = 0;  i < this.prodottiMagazzino.length ; i++){
          this.styleWarning[i] = 'none';
          this.prodQuantita[i] = data[i].Quantita;
          this.prodEnableConfirm[i] = 'none';
        }
        this.changeVisibility(9);
      },
      err => console.error(err),
      () => console.log('done loading test')
    );
   }
  getMisure() {
    this.serviceQta.getAll("TipoQuantita/GetAllQta").subscribe(
      data => { this.misure = data},
      err => console.error(err),
      () => console.log('done loading qta')
    );
    }
  getMagazzini() {
    this.serviceMagazzino.getAll("Magazzino/GetMagazzini").subscribe(
      data => { this.magazzini = data},
      err => console.error(err),
      () => console.log('done loading misure')
    );
    }
  getProdottiQta() {
    this.serviceProdQta.getAll("ProdottoQta/GetAllProdottiQta").subscribe(
      data => { this.prodottiQta = data},
      err => console.error(err),
      () => console.log('done loading prodottiQTa')
    );
    }
  getGiacenze() {
      this.serviceGiacenze.getAll("Giacenze/GetGiacenze").subscribe(
        // the first argument is a function which runs on success
        data => { this.giacenze = data},
        // the second argument is a function which runs on error
        err => console.error(err),
        // the third argument is a function which runs on completion
        () => console.log('done loading prodottiQTa')
      );
      }
  createQta() {
    this.misura={Id : this.idMisuraModel , MisuraIn : this.misuraInMisuraModel};
    
    this.serviceQta.create(this.misura,"TipoQuantita/InsertQta").subscribe(
       data => {
         this.getMisure();
        
         return true;
       },
       error => {
         console.error("Error saving misura!");
         return Observable.throw(error);
       }
    );
  
    }
  createProdQta(){
    
    this.prodQta={ ProdottoNome : this.prodQtaNomeModel , TipologiaQta : this.prodQtaMisuraModel, Immagine :this.prodQtaImg64};
    
    this.serviceProdQta.create(this.prodQta,"ProdottoQta/InsertProdottoQta").subscribe(
       data => {
         this.getProdottiQta();
         this.onClick(JSON.stringify(this.prodQta),'Prodotto inserito')
         this.changeVisibility(2);
         return true;
       },
       error => {
         console.error("Error saving misura!");
         return Observable.throw(error);
       }
    );
    }
  createMagazzino(){
    this.magazzino = { Nome : this.magazzinoNomeModel ,Locazione : this.magazzinoLocazioneModel};
      this.serviceMagazzino.create(this.magazzino,"Magazzino/InsertMagazzino").subscribe(
         data => {
           this.getMagazzini();
           this.changeVisibility(4);
           return true;
         },
         error => {
           console.error("Error saving magazzino!");
           return Observable.throw(error);
         }
      );
      }
  insertInClient(misuraIn:string){
    this.prodQtaMisuraModel = misuraIn;
    }
  insertInClient2(misuraIn:string){
      this.prodTipologiaQtaModelString = misuraIn;
      }
  magDetail(nomeMagazzino:string,idMagazzino:number){
    this.magazzinoIdModel = idMagazzino;
    this.magazzinoNomeModel = nomeMagazzino;
    this.magazzino = { Nome : this.magazzinoNomeModel , Locazione : this.magazzinoLocazioneModel}
    this.getProductsFromMagazzino(idMagazzino);
    }
  changeVisibility(section:number){
   for(let i = 0 ; i < this.visibility.length ; i++){
       i !==  section ? this.visibility[i] = 'none' : this.visibility[i] = 'block';
    }
    }
  changeVisibilityFoto(section:number){
      for(let i = 0 ; i < this.visibilityFoto.length ; i++){
          i !==  section ? this.visibilityFoto[i] = 'none' : this.visibilityFoto[i] = 'block';
       }
       }
  
  assegnaParametriProdottoAlModel(nomeProdotto:string,idProdotto:number,tipoQta:string){
    this.newGiacenzaTipoQtaProdotto = tipoQta;
    this.newGiacenzaNomeProdotto = nomeProdotto;
    this.newGiacenzaIdProdotto = idProdotto;
    }
  addGiacenza(){
    this.newGiacenza = {
      Scadenza : this.newGiacenzaScadenza,
      Inserimento : new Date(),
      Quantita : this.newGiacenzaQuantita,
      ProdottoId : this.newGiacenzaIdProdotto,
      MagazzinoId : this.magazzinoIdModel
    }
    this.serviceGiacenze.create(this.newGiacenza,"Giacenze/InsertGiacenze").subscribe(
      data => {
        this.onClick(JSON.stringify(this.newGiacenza),"Prodotto inserito in magazzino")
        return true;
      },
      error => {
        console.error("Error saving misura!");
        return Observable.throw(error);
      }
   );

    }
  preliminariTornaDa(){
    this.getProductsFromMagazzino(this.magazzinoIdModel);
    this.changeVisibility(9);
    }
  preliminariUpdateProdotto(prod){
    this.prodTipologiaQtaModelString = prod.TipologiaQta;
    this.prodIdModel = prod.Id;
    this.prodNomeModel = prod.ProdottoNome;
    this.prodTipologiaQtaModelId = prod.TipologiaQtaId;
    this.prodNomeTitleModel = prod.ProdottoNome;
    this.prodImmagine = prod.Immagine;
    this.prodImmagineOld = prod.Immagine;
    this.changeVisibility(11);
    }
  getFiles(event){
    this.logo = event.target.files[0];
   
        let reader = new FileReader();
    
        reader.onload = (e: any) => {
            this.logo = e.target.result;
        }
    
        reader.readAsDataURL(event.target.files[0]);
    this.files = event.target.files; 
    this.handleFileSelect(event);
    console.log(this.files);
    }
  getFiles2(event){
    this.prodImmagine = event.target.files[0];
   
        let reader = new FileReader();
    
        reader.onload = (e: any) => {
            this.prodImmagine = e.target.result;
        }
    
        reader.readAsDataURL(event.target.files[0]);
    this.files = event.target.files; 
    this.handleFileSelect(event);
    this.immagineModificata= true;
    this.changeVisibilityFoto(1);
    console.log(this.files);
    }
  
  
  handleFileSelect(evt){
      var files = evt.target.files;
      var file = files[0];
    
    if (files && file) {
        var reader = new FileReader();

        reader.onload =this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
    }
    }
  
  _handleReaderLoaded(readerEvt) {
     var binaryString = readerEvt.target.result;
            this.prodQtaImg64= btoa(binaryString);
            console.log(btoa(binaryString));     
    }
  aggiungi(numero:number){
    this.styleWarning[numero] = "yellow";
    this.prodEnableConfirm[numero] ="block";
    this.prodQuantita[numero]++;
    this.enableSaveAll = "block";
  }
  togli(numero:number){
    this.styleWarning[numero] = "yellow";
    this.prodQuantita[numero]--;
    this.prodEnableConfirm[numero] ="block";
    this.enableSaveAll = "block";
  }
  saveAll(magazzinoNomeModel:any){
    
  }
}
