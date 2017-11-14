import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpModule }    from '@angular/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from 'angular2-modal';
import { HttpService} from'./services/httpService';



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
    HttpService
  ],
  bootstrap: [AppComponent]
 
})
export class AppModule { }
