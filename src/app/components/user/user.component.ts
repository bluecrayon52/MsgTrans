import { Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { NgForm } from "@angular/forms/src/forms";
import {FormBuilder, FormGroup, Validators } from '@angular/forms'; 

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('myRouter', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.2)',
      })),
      transition('small <=> large', animate('100ms ease-in')),
    ]),
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

  rForm: FormGroup;
  post:any;                     // A property for our submitted form
  name:string = '';

  showMessage = false; 

  constructor(private fb: FormBuilder) { 
        this.rForm = fb.group({
          'name' : [null, Validators.required],
        });
  }

  addPost(post) {
    this.name = post.name;
    this.showMessage = true; 
  }
  
  // turn these into objects?
  appmsg: string;
  presmsg: string;
  sessmsg: string;
  transmsg: string;
  netmsg: string;
  datamsg: string;
  physmsg: string;

  public Click = false;
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

  color = 'primary';
  mode = 'determinate';
  value = 50;
  bufferValue = 75;

//  constructor(private dataService: DataService) {
//     console.log('constructor ran ...');
//    }

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
      message: 'Data Link Layer',
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
      message: 'hellp from computer 2!',
      state: 'small'
    };

  }

  // register (myForm: NgForm) {
  //   console.log('Successful registration');
  //   this.myMessage = myForm.value; 
  //   console.log("myMessage: "+this.myMessage); 
  //   console.log(myForm);
  //   console.log("myForm.value"+myForm.value);

  // }  

  getMessage(){
    return this.rForm.get('name').value
  }
  
  animateRouter(router) {
    router.state = (router.state === 'small' ? 'large' : 'small');
  }

  animateComputer(computer) {
    computer.state = (computer.state === 'small' ? 'large' : 'small');
  }


  public isClicked(layer) {
    layer.display = !layer.display;
  }

}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: number;
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
