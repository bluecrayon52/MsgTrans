import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../../services/data.service';
import {LayerSyncService} from '../../services/layer-sync.service';

import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { NgForm } from '@angular/forms/src/forms';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { MdProgressBar } from '@angular/material/material';

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css'],
})

export class User2Component implements OnInit {
  // input variables
  rForm: FormGroup;
  post: any;         // A property for our submitted form
  binMsg = '';  // holder for binary conversion
  msgClosed: boolean; // control form input
  switch: boolean;
  message: Message;

  layer: any; // keep track of layer engagement across components
  default: Layer;

  application: Layer;
  presentation: Layer;
  session: Layer;
  transport: Layer;
  network: Layer;
  datalink: Layer;
  physical: Layer;

  @ViewChild('a') public popApp: NgbPopover;
  @ViewChild('b') public popPres: NgbPopover;
  @ViewChild('c') public popSess: NgbPopover;
  @ViewChild('d') public popTrans: NgbPopover;
  @ViewChild('e') public popNet: NgbPopover;
  @ViewChild('f') public popData: NgbPopover;
  @ViewChild('g') public popPhys: NgbPopover;


  constructor(private fb: FormBuilder, private data: LayerSyncService) {

        this.rForm = fb.group({
          'msg' : [null, Validators.required],
        });
  }

  ngOnInit() {
    console.log('ngOnInit ran ...');

    this.switch = true; // default layer details
    this.data.currentLayer.subscribe(layer => this.layer = layer); // subscribe to the service

    this.default = this.layer;

    this.msgClosed = true;

    this.application = {
      name: 'application',
       message: 'Application Layer'
    };

    this.presentation = {
      name: 'presentation',
      message: 'Presentation Layer'
    };

    this.session = {
      name: 'session',
      message: 'Session Layer',
    };

    this.transport = {
      name: 'transport',
      message: 'Tranport Layer',
    };

    this.network = {
      name: 'network',
      message: 'Network Layer',
    };

    this.datalink = {
      name: 'data_link',
      message: 'Data Link Layer',   // TESTING HERE
    };

    this.physical = {
      name: 'physical',
      message: 'Physical Layer',
    };

    this.message = {
      payload: '',
      shown: false,
    };

  }

  diffLayer(layer: Layer) {
    this.data.changeLayer(layer);
  }

  addPost() {

    // control form input ( shut it down)
    this.msgClosed = false;

    this.message.payload = this.layer.message;
    // set Host 2 message
    this.application.message = this.message.payload;
    this.presentation.message = this.message.payload;
    this.session.message = this.message.payload;
    this.transport.message = this.message.payload;
    this.network.message = this.message.payload;

    this.convertToBin();

    this.startSequence();

  }

  convertToBin() {
    for (let i = 0; i < this.message.payload.length; i++) {
         this.binMsg += '0' + this.message.payload[i].charCodeAt(0).toString(2) + ' ';
      }
      this.datalink.message = this.binMsg;
      this.physical.message = this.binMsg;
  }

  closeMessage(msg) {
   this.binMsg = '';
   this.msgClosed = true;
   msg.shown = false;

   // reset host 1 message to default
   this.application.message = 'Application Layer';
   this.presentation.message = 'Presentation Layer';
   this.session.message = 'Session Layer';
   this.transport.message = 'Transport Layer';
   this.network.message = 'Network Layer';
   this.datalink.message = 'Data Link Layer';
   this.physical.message = 'Physical Layer';
  }

  popOpen(popup) {
    // if (this.message.shown){
      popup.open();
    // }
  }

  popClose(popup) {
    // if (this.message.shown){
      popup.close();
    // }
  }

  public startSequence() {
    console.log('sequence started.....');

    // scope anchor
    const that = this;

    // Physical Layer
    const physView = function(){
      that.switch = true;   // view layer detail
      that.diffLayer(that.physical);
    };
    const thatPhys = this.popPhys;
    setTimeout((function (){thatPhys.open(); physView(); }), 500);
    setTimeout((function(){thatPhys.close(); }), 2000);

    // Data Link Layer
    const dlView = function(){
      that.diffLayer(that.datalink);
    };
    const thatData = this.popData;
    setTimeout((function (){thatData.open(); dlView(); }), 2000);
    setTimeout((function(){thatData.close(); }), 3500);

    // Network Layer
    const netView = function(){
      that.diffLayer(that.network);
    };
    const thatNet = this.popNet;
    setTimeout((function (){thatNet.open(); netView(); }), 3500);
    setTimeout((function(){thatNet.close(); }), 5000);

    // Transport Layer
    const transView = function(){
      that.diffLayer(that.transport);
    };
    const thatTrans = this.popTrans;
    setTimeout((function (){thatTrans.open(); transView(); }), 5000);
    setTimeout((function(){thatTrans.close(); }), 6500);

    // Session Layer
    const sessView = function(){
      that.diffLayer(that.session);
    };
    const thatSess = this.popSess;
    setTimeout((function (){thatSess.open(); sessView(); }), 6500);
    setTimeout((function(){thatSess.close(); }), 8000);

    // Presentation Layer
    const presView = function(){
      that.diffLayer(that.presentation);
    };
    const thatPres = this.popPres;
    setTimeout((function (){thatPres.open(); presView(); }), 8000);
    setTimeout((function(){thatPres.close(); }), 9500);

    // Application Layer
    const appView = function(){
      that.diffLayer(that.application);
    };
    const thatApp = this.popApp;
    setTimeout((function (){thatApp.open(); appView(); }), 9500);
    setTimeout((function(){thatApp.close(); }), 11000);

    // Message Recieved
    const defaultView = function(){
      that.diffLayer(that.default);
    };
    const thatMsg = this.message;
    setTimeout((function (){thatMsg.shown = true; defaultView(); }), 11000);

  }
}

interface Layer {
  name: string;
  message: string;
}

interface Message {
  payload: string;
  shown: boolean;
}

