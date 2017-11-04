import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { User2Component } from './components/user2/user2.component';
import { User3Component } from './components/user3/user3.component';

import { SignalComponent } from './components/signal/signal.component';
import { LayerComponent } from './components/layer/layer.component';

import { DataService } from './services/data.service';
import {LayerSyncService} from './services/layer-sync.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdButtonModule, MdInputModule, MdProgressBarModule, MdProgressSpinnerModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    User2Component,
    User3Component,
    SignalComponent,
    LayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    [MdButtonModule, MdInputModule, MdProgressBarModule, MdProgressSpinnerModule] // Material Imports
  ],
  providers: [DataService, LayerSyncService],
  bootstrap: [AppComponent, UserComponent, User2Component, User3Component, SignalComponent]
})
export class AppModule { }
