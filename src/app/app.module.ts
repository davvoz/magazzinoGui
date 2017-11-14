import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TipoQtaService} from'./services/tipoQtaService';
import { MagazzinoService} from'./services/magazzinoService';
import { ProdottoQtaService} from'./services/prodottoQtaService';
import { TestService} from'./services/testService';
import { GiacenzeService} from'./services/giacenzeService';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [
    TipoQtaService,
    MagazzinoService,
    ProdottoQtaService,
    TestService,
    GiacenzeService
  ],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
