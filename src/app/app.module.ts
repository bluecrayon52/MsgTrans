import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from './services/data.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule, MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    [MdButtonModule, MdInputModule, MdProgressBarModule, MdProgressSpinnerModule] //Material Imports 
  ],
  providers: [DataService],
  bootstrap: [AppComponent, UserComponent]
})
export class AppModule { }
