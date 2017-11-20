import { Component, OnInit, ViewChild, EventEmitter, Output, Input} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { User3Component } from '../user3/user3.component';

import { DataService } from '../../services/data.service';
import {LayerSyncService} from '../../services/layer-sync.service';

import { NgForm } from '@angular/forms/src/forms';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { MdProgressBar } from '@angular/material/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})

export class UserComponent implements OnInit {

  // input variables
  rForm: FormGroup;
  post: any;         // A property for our submitted form
  binMsg = '';  // holder for binary conversion
  msgClosed: boolean; // control form input
  switch: boolean;
  message: Message;

  layer: any; // keep track of layer iengagement across components
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
      shown: false
    };

  }

  diffLayer(layer: Layer) {
    this.data.changeLayer(layer);
  }

  addPost(post) {
    // control form input ( shut it down)
    this.msgClosed = false;

    this.message.payload = post.msg;
    this.rForm.reset();
    this.convertToBin();
    console.log(this.binMsg);
    this.startSequence();

    this.datalink.message = this.binMsg;
    this.physical.message = this.binMsg;

    this.application.message = this.message.payload;
    this.presentation.message = this.message.payload;
    this.session.message = this.message.payload;
    this.transport.message = this.message.payload;
    this.network.message = this.message.payload;

  }

  convertToBin() {
    for (let i = 0; i < this.message.payload.length; i++) {
         this.binMsg += '0' + this.message.payload[i].charCodeAt(0).toString(2) + ' ';
      }
  }

  closeMessage(msg) {
   this.binMsg = '';
   this.msgClosed = true;
   msg.shown = false;
  }

  popOpen(popup) {
      popup.open();
  }

  popClose(popup) {
      popup.close();
  }

  public startSequence() {
    console.log('sequence started.....');
    // scope anchor
    const that = this;

    // Application Layer
    const appView = function(){
      that.switch = true;
      that.diffLayer(that.application);
    };
    const thatApp = this.popApp;
    setTimeout((() => {thatApp.open(); appView(); }), 500);
    setTimeout((function(){thatApp.close(); }), 2000);

    // Presentation Layer
    const presView = function(){
      that.diffLayer(that.presentation);
    };
    const thatPres = this.popPres;
    setTimeout((function (){thatPres.open(); presView(); }), 2000);
    setTimeout((function(){thatPres.close(); }), 3500);

    // Session Layer
    const sessView = function(){
      that.diffLayer(that.session);
    };
    const thatSess = this.popSess;
    setTimeout((function (){thatSess.open(); sessView(); }), 3500);
    setTimeout((function(){thatSess.close(); }), 5000);

    // Transport Layer
    const transView = function(){
      that.diffLayer(that.transport);
    };
    const thatTrans = this.popTrans;
    setTimeout((function (){thatTrans.open(); transView(); }), 5000);
    setTimeout((function(){thatTrans.close(); }), 6500);

    // Network Layer
    const netView = function(){
      that.diffLayer(that.network);
    };
    const thatNet = this.popNet;
    setTimeout((function (){thatNet.open(); netView(); }), 6500);
    setTimeout((function(){thatNet.close(); }), 8000);

    // Data Link Layer
    const dlView = function(){
      that.diffLayer(that.datalink);
    };
    const thatData = this.popData;
    setTimeout((function (){thatData.open(); dlView(); }), 8000);
    setTimeout((function(){thatData.close(); }), 9500);

    // Physical Layer
    const physView = function(){
      that.diffLayer(that.physical);
    };

    const finish = function(){
      console.log('start ball animation');
      that.diffLayer(that.application);
    };

    const thatPhys = this.popPhys;
    setTimeout((function (){thatPhys.open(); physView(); }), 9500);
    setTimeout((function(){thatPhys.close(); finish(); }), 11000);   // indicate that djk and signal can execute
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

