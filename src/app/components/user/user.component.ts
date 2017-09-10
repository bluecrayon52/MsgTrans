import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

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
  appmsg: string;
  presmsg: string;
  sessmsg: string;
  transmsg: string;
  netmsg: string;
  datamsg: string;
  physmsg: string;
  address: Address;
  hobbies: string[];
  hello: any;
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

 constructor(private dataService: DataService) {
    console.log('constructor ran ...');
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

    this.address = {
      street: '870 W 4th St',
      city: 'Winston-Salem',
      state: 'NC',
      zip: 27101
    };

    this.hobbies = ['play guitar', 'exercise', 'cooking'];
    this.hello = 'anything';

  }

  animateRouter(router) {
    router.state = (router.state === 'small' ? 'large' : 'small');
  }

  animateComputer(computer) {
    computer.state = (computer.state === 'small' ? 'large' : 'small');
  }

  onClick() {
    console.log('onClick ran ...');
    this.hobbies.push('Angular');
  }

  public isClicked(layer) {
    layer.display = !layer.display;
  }

 addHobby(hobby) {
    console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
 }

 deleteHobby(hobby) {
   console.log(hobby);
   for ( let i = 0; i < this.hobbies.length; i++) {
      if (this.hobbies[i] === hobby) {
        this.hobbies.splice(i, 1);
      }
   }
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
