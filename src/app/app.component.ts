import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 
 assignment: string;  // a1, a2, a3, or home  

 ngOnInit(){
 this.assignment = "home"; 
 }
 
 setAssign(a:string) {
  this.assignment = a; 
  } 
}

