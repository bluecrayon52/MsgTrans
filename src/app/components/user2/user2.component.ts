import { Component, OnInit, ViewChild } from '@angular/core';

import { DataService } from '../../services/data.service';
import {LayerSyncService} from '../../services/layer-sync.service';

import { trigger, state, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { NgForm } from "@angular/forms/src/forms";
import {FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { NgbPopover } from "@ng-bootstrap/ng-bootstrap";
import { MdProgressBar } from "@angular/material/material";

@Component({
  selector: 'app-user2',
  templateUrl: './user2.component.html',
  styleUrls: ['./user2.component.css'],
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

export class User2Component implements OnInit {
  // input variables 
  rForm: FormGroup;
  post:any;         // A property for our submitted form
  binMsg:string = '';  // holder for binary conversion
  msgClosed: boolean; // control form input 
  switch: boolean; 
  message: Message; 
  message2: Message; 

  destHost: string; // denotes what host the message is sent to 

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

  application3: Layer;
  presentation3: Layer;
  session3: Layer;
  transport3: Layer;
  network3: Layer;
  datalink3: Layer;
  physical3: Layer;

  router1: Router;
  router2: Router;
  router3: Router; 

  computer1: Computer;
  computer2: Computer;

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

  @ViewChild('s') public popApp3: NgbPopover;
  @ViewChild('t') public popPres3: NgbPopover;
  @ViewChild('u') public popSess3: NgbPopover;
  @ViewChild('v') public popTrans3: NgbPopover;
  @ViewChild('w') public popNet3: NgbPopover;
  @ViewChild('x') public popData3: NgbPopover;
  @ViewChild('y') public popPhys3: NgbPopover;

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

    this.destHost = '';   // denotes what host the message is sent to 
    this.switch = true; // default layer details 
    this.data.currentLayer.subscribe(layer => this.layer = layer) // subscribe to the service 
    
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

    this.application3 = {
      name: 'application3', 
       message: 'Application Layer 3'
    };

    this.presentation3 = {
      name: 'presentation3',
      message: 'Presentation Layer 3'
    };

    this.session3 = {
      name: 'session3',
      message: 'Session Layer 3',
    };

    this.transport3 = {
      name: 'transport3',
      message: 'Tranport Layer 3',
    };

    this.network3 = {
      name: 'network3',
      message: 'Network Layer 3',
    };

    this.datalink3 = {
      name: 'data_link3',
      message: 'Data Link Layer 3',   // TESTING HERE
    };

    this.physical3 = { 
      name: 'physical3',            
      message: 'Physical Layer 3',
    };

    this.router1 = {
      message: 'hello from router 1!',
      state: 'small'
    };

    this.router2 = {
      message: 'hello from router 2!',
      state: 'small'
    };

    this.router3 = {
      message: 'hello from router 3!',
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
      shown: false, 
      shown2: false
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

  diffLayer(layer:object){
    this.data.changeLayer(layer)
  }

  addPost(post) {
   
    // control form input ( shut it down)
    this.msgClosed = false; 

    this.message.payload = post.msg;
  
    this.rForm.reset();
    this.convertToBin(); 
    console.log(this.binMsg);  
    this.startSequence(); 

    // set Host 1 message 
    this.application.message = this.message.payload;
    this.presentation.message = this.message.payload; 
    this.session.message = this.message.payload; 
    this.transport.message = this.message.payload;
    this.network.message = this.message.payload; 
    this.datalink.message = this.binMsg; 
    this.physical.message = this.binMsg;
    this.signal_1.message = this.binMsg;

    // set Host 2 message if it is the destination 
    if (this.destHost == 'h2'){
    this.application2.message = this.message.payload;
    this.presentation2.message = this.message.payload; 
    this.session2.message = this.message.payload; 
    this.transport2.message = this.message.payload;
    this.network2.message = this.message.payload; 
    this.datalink2.message = this.binMsg; 
    this.physical2.message = this.binMsg;
    this.signal_2.message = this.binMsg;
    }

    // set Host 3 message if it is the destination 
    else if (this.destHost == 'h3'){
    this.application3.message = this.message.payload;
    this.presentation3.message = this.message.payload; 
    this.session3.message = this.message.payload; 
    this.transport3.message = this.message.payload;
    this.network3.message = this.message.payload; 
    this.datalink3.message = this.binMsg; 
    this.physical3.message = this.binMsg; 
    this.signal_3.message = this.binMsg; 
    }
  }

  convertToBin() { 
    for (var i = 0; i < this.message.payload.length; i++) {
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
   this.binMsg = ''; 
   this.msgClosed = true; 

   if(this.destHost=='h2'){
   msg.shown = false;  
   }

   else if(this.destHost =='h3'){
   msg.shown2 = false; 
   }

   this.destHost = '';  // reset destination 

   // reset host 1 message to default 
   this.application.message = 'Application Layer';
   this.presentation.message = 'Presentation Layer';
   this.session.message = 'Session Layer';
   this.transport.message = 'Transport Layer';
   this.network.message = 'Network Layer';
   this.datalink.message = 'Data Link Layer';
   this.physical.message = 'Physical Layer';

   // reset host 2 message to default 
   this.application2.message = 'Application Layer 2';
   this.presentation2.message = 'Presentation Layer 2';
   this.session2.message = 'Session Layer 2';
   this.transport2.message = 'Transport Layer 2';
   this.network2.message = 'Network Layer 2';
   this.datalink2.message = 'Data Link Layer 2';
   this.physical2.message = 'Physical Layer 2';

   // reset host 3 message to default 
   this.application3.message = 'Application Layer 3';
   this.presentation3.message = 'Presentation Layer 3';
   this.session3.message = 'Session Layer 3';
   this.transport3.message = 'Transport Layer 3';
   this.network3.message = 'Network Layer 3';
   this.datalink3.message = 'Data Link Layer 3';
   this.physical3.message = 'Physical Layer 3';

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

  setDest(host:string){
    this.destHost = host;   // h2 or h3 
  }
  
  public startSequence() {
    console.log("sequence started.....");

    // progress spinner on 
    // var thatSpin= this.progSpin; 
    // setTimeout((function (){thatSpin.shown = true; }), 200);  

    // scope anchor 
    var that = this; 

    // Application Layer 
    var appView = function(){
      that.switch = true; // view layer details 
      that.diffLayer(that.application);
    }
    var thatApp = this.popApp; 
    setTimeout((() => {thatApp.open(); appView();}), 500); 
    setTimeout((function(){thatApp.close()}), 2000);

    // Presentation Layer  
    var presView = function(){
      that.diffLayer(that.presentation);
    }
    var thatPres = this.popPres; 
    setTimeout((function (){thatPres.open(); presView();}), 2000); 
    setTimeout((function(){thatPres.close()}), 3500);

    // Session Layer
    var sessView = function(){
      that.diffLayer(that.session);
    }
    var thatSess = this.popSess; 
    setTimeout((function (){thatSess.open(); sessView();}), 3500); 
    setTimeout((function(){thatSess.close()}), 5000); 

    // Transport Layer 
    var transView = function(){
      that.diffLayer(that.transport);
    }
    var thatTrans = this.popTrans; 
    setTimeout((function (){thatTrans.open(); transView();}), 5000); 
    setTimeout((function(){thatTrans.close()}), 6500);

    // Network Layer 
    var netView = function(){
      that.diffLayer(that.network);
    }
    var thatNet = this.popNet; 
    setTimeout((function (){thatNet.open(); netView();}), 6500); 
    setTimeout((function(){thatNet.close()}), 8000);

    // Data Link Layer 
    var dlView = function(){
      that.diffLayer(that.datalink);
    }
    var thatData = this.popData; 
    setTimeout((function (){thatData.open(); dlView();}), 8000);     
    setTimeout((function(){thatData.close()}), 9500);

    // Physical Layer 
    var physView = function(){
      that.diffLayer(that.physical);
    }
    var thatPhys = this.popPhys; 
    setTimeout((function (){thatPhys.open(); physView();}), 9500);  
    setTimeout((function(){thatPhys.close()}), 11000);

    // progress bar 1 
    var sigView1 = function(){
      that.switch = false;   // signal view 
      that.diffLayer(that.signal_1);
    }
    var thatBar1 = this.progBar1; 
    setTimeout((function (){thatBar1.shown = true; sigView1();}), 11000);  
    setTimeout((function(){thatBar1.shown = false; }), 12500);

    // // progress bar 2
    // var sigView2 = function(){
    //   that.diffLayer(that.signal_2);
    // }
    // var thatBar2 = this.progBar2; 
    // setTimeout((function (){thatBar2.shown = true; sigView2(); }), 12500);  
    // setTimeout((function(){thatBar2.shown = false; }), 14000);

    // // progress bar 3 
    // var sigView3 = function(){
    //   that.diffLayer(that.signal_3);
    // }
    // var thatBar3 = this.progBar3; 
    // setTimeout((function (){thatBar3.shown = true; sigView3();}), 14000);  
    // setTimeout((function(){thatBar3.shown = false; }), 15500);
  if(this.destHost == 'h2'){
    // Physical Layer 2
    var physView2 = function(){
      that.switch = true;   // view layer detail 
      that.diffLayer(that.physical2);
    }
    var thatPhys2 = this.popPhys2; 
    setTimeout((function (){thatPhys2.open(); physView2();}), 15500);  
    setTimeout((function(){thatPhys2.close()}), 17000);

    // Data Link Layer 2
    var dlView2 = function(){
      that.diffLayer(that.datalink2);
    }
    var thatData2 = this.popData2; 
    setTimeout((function (){thatData2.open(); dlView2();}), 17000);     
    setTimeout((function(){thatData2.close()}), 18500);

    // Network Layer 2
    var netView2 = function(){
      that.diffLayer(that.network2);
    }
    var thatNet2 = this.popNet2; 
    setTimeout((function (){thatNet2.open(); netView2();}), 18500); 
    setTimeout((function(){thatNet2.close()}), 20000);

    // Transport Layer 2
    var transView2= function(){
      that.diffLayer(that.transport2);
    }
    var thatTrans2 = this.popTrans2; 
    setTimeout((function (){thatTrans2.open(); transView2();}), 20000); 
    setTimeout((function(){thatTrans2.close()}), 21500);

    // Session Layer 2
    var sessView2 = function(){
      that.diffLayer(that.session2);
    }
    var thatSess2 = this.popSess2; 
    setTimeout((function (){thatSess2.open(); sessView2();}), 21500); 
    setTimeout((function(){thatSess2.close()}), 23000); 

    // Presentation Layer 2
    var presView2 = function(){
      that.diffLayer(that.presentation2);
    }
    var thatPres2 = this.popPres2; 
    setTimeout((function (){thatPres2.open(); presView2();}), 23000); 
    setTimeout((function(){thatPres2.close()}), 24500);

    // Application Layer 2 
    var appView2 = function(){
      that.diffLayer(that.application2);
    }
    var thatApp2 = this.popApp2; 
    setTimeout((function (){thatApp2.open(); appView2();}), 24500); 
    setTimeout((function(){thatApp2.close()}), 26000);

    // Message Recieved 
    var defaultView = function(){
      that.diffLayer(that.default);
    }
    var thatMsg = this.message; 
    setTimeout((function (){thatMsg.shown = true; defaultView();}), 26000); 
  }

  else if (this.destHost == 'h3'){
    // Physical Layer 3
    var physView3 = function(){
      that.switch = true;   // view layer detail 
      that.diffLayer(that.physical3);
    }
    var thatPhys3 = this.popPhys3; 
    setTimeout((function (){thatPhys3.open(); physView2();}), 15500);  
    setTimeout((function(){thatPhys3.close()}), 17000);

    // Data Link Layer 3
    var dlView3 = function(){
      that.diffLayer(that.datalink3);
    }
    var thatData3 = this.popData3; 
    setTimeout((function (){thatData3.open(); dlView3();}), 17000);     
    setTimeout((function(){thatData3.close()}), 18500);

    // Network Layer 3
    var netView3 = function(){
      that.diffLayer(that.network3);
    }
    var thatNet3 = this.popNet3; 
    setTimeout((function (){thatNet3.open(); netView2();}), 18500); 
    setTimeout((function(){thatNet3.close()}), 20000);

    // Transport Layer 3
    var transView3= function(){
      that.diffLayer(that.transport3);
    }
    var thatTrans3 = this.popTrans3; 
    setTimeout((function (){thatTrans3.open(); transView3();}), 20000); 
    setTimeout((function(){thatTrans3.close()}), 21500);

    // Session Layer 3
    var sessView3 = function(){
      that.diffLayer(that.session3);
    }
    var thatSess3 = this.popSess3; 
    setTimeout((function (){thatSess3.open(); sessView3();}), 21500); 
    setTimeout((function(){thatSess3.close()}), 23000); 

    // Presentation Layer 3
    var presView3 = function(){
      that.diffLayer(that.presentation3);
    }
    var thatPres3 = this.popPres3; 
    setTimeout((function (){thatPres3.open(); presView3();}), 23000); 
    setTimeout((function(){thatPres3.close()}), 24500);

    // Application Layer 3 
    var appView3 = function(){
      that.diffLayer(that.application3);
    }
    var thatApp3 = this.popApp3; 
    setTimeout((function (){thatApp3.open(); appView3();}), 24500); 
    setTimeout((function(){thatApp3.close()}), 26000);

    // Message Recieved 
    var defaultView = function(){
      that.diffLayer(that.default);
    }
    var thatMsg = this.message; 
    setTimeout((function (){thatMsg.shown2 = true; defaultView();}), 26000); 
  }
    // // progress spinner off 
    // setTimeout((function (){thatSpin.shown = false; }), 26000); 
  } 

}

interface Layer {
  name: string 
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
  shown2: boolean;  
}

interface Progress { 
  shown: boolean; 
}