import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../../services/data.service';
import {LayerSyncService} from '../../services/layer-sync.service';

import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { NgForm } from '@angular/forms/src/forms';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { MdProgressBar } from '@angular/material/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [

    // animate the routers
    trigger('myRouter', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),
      transition('small <=> large', animate('100ms ease-in')),
    ]),

    // animate the computers
    trigger('myComputer', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),
      transition('small <=> large', animate('100ms ease-in')),
    ])
  ]
})

export class UserComponent implements OnInit {
  // input variables
  rForm: FormGroup;
  post: any;         // A property for our submitted form
  binMsg = '';  // holder for binary conversion
  msgClosed: boolean; // control form input

  // turn these into objects?
  appmsg: string;
  presmsg: string;
  sessmsg: string;
  transmsg: string;
  netmsg: string;
  datamsg: string;
  physmsg: string;

  layer: object; // keep track of layer iengagement across components
  default: object;
  application: Layer;
  presentation: Layer;
  session: Layer;
  transport: Layer;
  network: Layer;
  datalink: Layer;
  physical: Layer;

  signal_1: Layer;
  signal_2: Layer;
  signal_3: Layer;

  application2: Layer;
  presentation2: Layer;
  session2: Layer;
  transport2: Layer;
  network2: Layer;
  datalink2: Layer;
  physical2: Layer;

  router1: Router;
  router2: Router;
  computer1: Computer;
  computer2: Computer;
  message: Message;
  progBar1: Progress;
  progBar2: Progress;
  progBar3: Progress;
  progSpin: Progress;

  @ViewChild('a') public popApp: NgbPopover;
  @ViewChild('b') public popPres: NgbPopover;
  @ViewChild('c') public popSess: NgbPopover;
  @ViewChild('d') public popTrans: NgbPopover;
  @ViewChild('e') public popNet: NgbPopover;
  @ViewChild('f') public popData: NgbPopover;
  @ViewChild('g') public popPhys: NgbPopover;

  @ViewChild('h') public popComp: NgbPopover;
  @ViewChild('i') public popRout: NgbPopover;
  @ViewChild('j') public popComp2: NgbPopover;
  @ViewChild('k') public popRout2: NgbPopover;

  @ViewChild('l') public popApp2: NgbPopover;
  @ViewChild('m') public popPres2: NgbPopover;
  @ViewChild('n') public popSess2: NgbPopover;
  @ViewChild('o') public popTrans2: NgbPopover;
  @ViewChild('p') public popNet2: NgbPopover;
  @ViewChild('q') public popData2: NgbPopover;
  @ViewChild('r') public popPhys2: NgbPopover;

  // progress bar and spinner vars
  color = 'primary';
  spinMode = 'indeterminate';
  barMode = 'indeterminate';
  value = 50;
  bufferValue = 100;


  constructor(private fb: FormBuilder, private data: LayerSyncService) {

        this.rForm = fb.group({
          'msg' : [null, Validators.required],
        });
  }

  ngOnInit() {
    console.log('ngOnInit ran ...');

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

    this.signal_1 = {
      name: 'signal_1',
      message: 'Signal One',
    };

    this.signal_2 = {
      name: 'signal_2',
      message: 'Signal Two',
    };

    this.signal_3 = {
      name: 'signal_3',
      message: 'Signal Three',
    };

    this.application2 = {
      name: 'application2',
       message: 'Application Layer 2'
    };

    this.presentation2 = {
      name: 'presentation2',
      message: 'Presentation Layer 2'
    };

    this.session2 = {
      name: 'session2',
      message: 'Session Layer 2',
    };

    this.transport2 = {
      name: 'transport2',
      message: 'Tranport Layer 2',
    };

    this.network2 = {
      name: 'network2',
      message: 'Network Layer 2',
    };

    this.datalink2 = {
      name: 'data_link2',
      message: 'Data Link Layer 2',   // TESTING HERE
    };

    this.physical2 = {
      name: 'physical2',
      message: 'Physical Layer 2',
    };

    this.router1 = {
      message: 'hello from router 1!',
      state: 'small'
    };

    this.router2 = {
      message: 'hello from router 2!',
      state: 'small'
    };

    this.computer1 = {
      message: 'hello from computer 1!',
      state: 'small'
    };

    this.computer2 = {
      message: 'hello from computer 2!',
      state: 'small'
    };

    this.message = {
      payload: '',
      shown: false
    };

    this.progBar1 = {
      shown: false
    };

    this.progBar2 = {
      shown: false
    };

    this.progBar3 = {
      shown: false
    };

    this.progSpin = {
      shown: false
    };

  }

  diffLayer(layer: object) {
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

    this.signal_1.message = this.binMsg;
    this.signal_2.message = this.binMsg;
    this.signal_3.message = this.binMsg;

    this.datalink.message = this.binMsg;
    this.physical.message = this.binMsg;

    this.datalink2.message = this.binMsg;
    this.physical2.message = this.binMsg;

    this.application.message = this.message.payload;
    this.presentation.message = this.message.payload;
    this.session.message = this.message.payload;
    this.transport.message = this.message.payload;
    this.network.message = this.message.payload;

    this.application2.message = this.message.payload;
    this.presentation2.message = this.message.payload;
    this.session2.message = this.message.payload;
    this.transport2.message = this.message.payload;
    this.network2.message = this.message.payload;

  }

  convertToBin() {
    for (let i = 0; i < this.message.payload.length; i++) {
         this.binMsg += '0' + this.message.payload[i].charCodeAt(0).toString(2) + ' ';
      }
  }

  animateRouter(router) {
    router.state = (router.state === 'small' ? 'large' : 'small');
  }

  animateComputer(computer) {
    computer.state = (computer.state === 'small' ? 'large' : 'small');
  }

  closeMessage(msg) {
   this.binMsg = '';
   this.msgClosed = true;
   msg.shown = false;
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

    // progress spinner on
    const thatSpin = this.progSpin;
    setTimeout((function (){thatSpin.shown = true; }), 200);

    // scope anchor
    const that = this;

    // Application Layer
    const appView = function(){
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
    const thatPhys = this.popPhys;
    setTimeout((function (){thatPhys.open(); physView(); }), 9500);
    setTimeout((function(){thatPhys.close(); }), 11000);

    // progress bar 1
    const sigView1 = function(){
      that.diffLayer(that.signal_1);
    };
    const thatBar1 = this.progBar1;
    setTimeout((function (){thatBar1.shown = true; sigView1(); }), 11000);
    setTimeout((function(){thatBar1.shown = false; }), 12500);

    // progress bar 2
    const sigView2 = function(){
      that.diffLayer(that.signal_2);
    };
    const thatBar2 = this.progBar2;
    setTimeout((function (){thatBar2.shown = true; sigView2(); }), 12500);
    setTimeout((function(){thatBar2.shown = false; }), 14000);

    // progress bar 3
    const sigView3 = function(){
      that.diffLayer(that.signal_3);
    };
    const thatBar3 = this.progBar3;
    setTimeout((function (){thatBar3.shown = true; sigView3(); }), 14000);
    setTimeout((function(){thatBar3.shown = false; }), 15500);

    // Physical Layer 2
    const physView2 = function(){
      that.diffLayer(that.physical2);
    };
    const thatPhys2 = this.popPhys2;
    setTimeout((function (){thatPhys2.open(); physView2(); }), 15500);
    setTimeout((function(){thatPhys2.close(); }), 17000);

    // Data Link Layer 2
    const dlView2 = function(){
      that.diffLayer(that.datalink2);
    };
    const thatData2 = this.popData2;
    setTimeout((function (){thatData2.open(); dlView2(); }), 17000);
    setTimeout((function(){thatData2.close(); }), 18500);

    // Network Layer 2
    const netView2 = function(){
      that.diffLayer(that.network2);
    };
    const thatNet2 = this.popNet2;
    setTimeout((function (){thatNet2.open(); netView2(); }), 18500);
    setTimeout((function(){thatNet2.close(); }), 20000);

    // Transport Layer 2
    const transView2 = function(){
      that.diffLayer(that.transport2);
    };
    const thatTrans2 = this.popTrans2;
    setTimeout((function (){thatTrans2.open(); transView2(); }), 20000);
    setTimeout((function(){thatTrans2.close(); }), 21500);

    // Session Layer 2
    const sessView2 = function(){
      that.diffLayer(that.session2);
    };
    const thatSess2 = this.popSess2;
    setTimeout((function (){thatSess2.open(); sessView2(); }), 21500);
    setTimeout((function(){thatSess2.close(); }), 23000);

    // Presentation Layer 2
    const presView2 = function(){
      that.diffLayer(that.presentation2);
    };
    const thatPres2 = this.popPres2;
    setTimeout((function (){thatPres2.open(); presView2(); }), 23000);
    setTimeout((function(){thatPres2.close(); }), 24500);

    // Application Layer 2
    const appView2 = function(){
      that.diffLayer(that.application2);
    };
    const thatApp2 = this.popApp2;
    setTimeout((function (){thatApp2.open(); appView2(); }), 24500);
    setTimeout((function(){thatApp2.close(); }), 26000);

    // Message Recieved
    const defaultView = function(){
      that.diffLayer(that.default);
    };
    const thatMsg = this.message;
    setTimeout((function (){thatMsg.shown = true; defaultView(); }), 26000);

    // progress spinner off
    setTimeout((function (){thatSpin.shown = false; }), 26000);
  }

}

interface Layer {
  name: string;
  message: string;
}

interface Router {
  message: string;
  state: string;
}

interface Computer {
  message: string;
  state: string;
}

interface Delay {
  show: number;
  hide: number;
}

interface Message {
  payload: string;
  shown: boolean;
}

interface Progress {
  shown: boolean;
}
