import { Component, OnInit, ViewChild} from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { NgForm } from "@angular/forms/src/forms";
import {FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { MdProgressBar } from "@angular/material/material";

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
  post:any;         // A property for our submitted form
  binMsg:string = '';  // holder for binary conversion 

  // turn these into objects?
  appmsg: string;
  presmsg: string;
  sessmsg: string;
  transmsg: string;
  netmsg: string;
  datamsg: string;
  physmsg: string;

  application: Layer;
  presentation: Layer;
  session: Layer;
  transport: Layer;
  network: Layer;
  datalink: Layer;
  physical: Layer;
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


  constructor(private fb: FormBuilder) { 
        this.rForm = fb.group({
          'msg' : [null, Validators.required],
        });
  }

  ngOnInit() {
    console.log('ngOnInit ran ...');

    this.application = {
       message: 'Application Layer',
       display: false
    };

    this.presentation = {
      message: 'Presentation Layer',
      display: false
    };

    this.session = {
      message: 'Session Layer',
      display: false
    };

    this.transport = {
      message: 'Tranport Layer',
      display: false
    };

    this.network = {
      message: 'Network Layer',
      display: false
    };

    this.datalink = {
      message: 'Data and Padding',   // TESTING HERE
      display: false
    };

    this.physical = {             
      message: 'Physical Layer',
      display: false 
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

  addPost(post) {
    this.message.payload = post.msg;
    this.rForm.reset();
    this.convertToBin(); 
    console.log(this.binMsg); 
    this.startSequence(); 
    this.datalink.message = this.binMsg; 
    this.physical.message = this.binMsg;
    this.application.message = this.message.payload;
    this.session.message = this.message.payload; 
    this.transport.message = this.message.payload;
    this.network.message = this.message.payload; 
  }

  convertToBin() {
      for (var i=0; i < this.message.payload.length; i++) {
         this.binMsg +="0"+this.message.payload[i].charCodeAt(0).toString(2) + " ";
      }
  } 

  animateRouter(router) {
    router.state = (router.state === 'small' ? 'large' : 'small');
  }

  animateComputer(computer) {
    computer.state = (computer.state === 'small' ? 'large' : 'small');
  }

  closeMessage(msg) {
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
    console.log("sequence started.....");

    var thatSpin= this.progSpin; 
    setTimeout((function (){thatSpin.shown = true; }), 200);  

    // Application Layer 
    var thatApp = this.popApp; 
    setTimeout((function (){thatApp.open()}), 500); 
    setTimeout((function(){thatApp.close()}), 2000);

    // Presentation Layer  
    var thatPres = this.popPres; 
    setTimeout((function (){thatPres.open()}), 2000); 
    setTimeout((function(){thatPres.close()}), 3500);

    // Session Layer
    var thatSess = this.popSess; 
    setTimeout((function (){thatSess.open()}), 3500); 
    setTimeout((function(){thatSess.close()}), 5000); 

    // Transport Layer 
    var thatTrans = this.popTrans; 
    setTimeout((function (){thatTrans.open()}), 5000); 
    setTimeout((function(){thatTrans.close()}), 6500);

    // Network Layer 
    var thatNet = this.popNet; 
    setTimeout((function (){thatNet.open()}), 6500); 
    setTimeout((function(){thatNet.close()}), 8000);

    // Data Link Layer 
    var thatData = this.popData; 
    setTimeout((function (){thatData.open()}), 8000);     
    setTimeout((function(){thatData.close()}), 9500);

    // Physical Layer 
    var thatPhys = this.popPhys; 
    setTimeout((function (){thatPhys.open()}), 9500);  
    setTimeout((function(){thatPhys.close()}), 11000);

    // progress bar 1 
    var thatBar1 = this.progBar1; 
    setTimeout((function (){thatBar1.shown = true; }), 11000);  
    setTimeout((function(){thatBar1.shown = false; }), 12500);

    // progress bar 2
    var thatBar2 = this.progBar2; 
    setTimeout((function (){thatBar2.shown = true; }), 12500);  
    setTimeout((function(){thatBar2.shown = false; }), 14000);

    // progress bar 3 
    var thatBar3 = this.progBar3; 
    setTimeout((function (){thatBar3.shown = true; }), 14000);  
    setTimeout((function(){thatBar3.shown = false; }), 15500);
  
    // Physical Layer 2
    var thatPhys2 = this.popPhys2; 
    setTimeout((function (){thatPhys2.open()}), 15500);  
    setTimeout((function(){thatPhys2.close()}), 17000);

    // Data Link Layer 2
    var thatData2 = this.popData2; 
    setTimeout((function (){thatData2.open()}), 17000);     
    setTimeout((function(){thatData2.close()}), 18500);

    // Network Layer 2
    var thatNet2 = this.popNet2; 
    setTimeout((function (){thatNet2.open()}), 18500); 
    setTimeout((function(){thatNet2.close()}), 20000);

    // Transport Layer 2
    var thatTrans2 = this.popTrans2; 
    setTimeout((function (){thatTrans2.open()}), 20000); 
    setTimeout((function(){thatTrans2.close()}), 21500);

    // Session Layer 2
    var thatSess2 = this.popSess2; 
    setTimeout((function (){thatSess2.open()}), 21500); 
    setTimeout((function(){thatSess2.close()}), 23000); 

    // Presentation Layer 2
    var thatPres2 = this.popPres2; 
    setTimeout((function (){thatPres2.open()}), 23000); 
    setTimeout((function(){thatPres2.close()}), 24500);

    // Application Layer 2 
    var thatApp2 = this.popApp2; 
    setTimeout((function (){thatApp2.open()}), 24500); 
    setTimeout((function(){thatApp2.close()}), 26000);

    var thatMsg = this.message; 
    setTimeout((function (){thatMsg.shown = true; }), 26000); 

    setTimeout((function (){thatSpin.shown = false; }), 26000); 
  }

}

interface Layer {
  message: string;
  display: boolean;
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