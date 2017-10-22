import { Component, OnInit, ElementRef } from '@angular/core';
import {LayerSyncService} from '../../services/layer-sync.service';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})

export class SignalComponent implements OnInit {
   
  layer: object;
  unit: number; // amplitude 
  canvas: HTMLCanvasElement; 
  context:  CanvasRenderingContext2D; 
  height: number; 
  width: number; 
  xAxis: number;  
  yAxis: number; 
  t: number = 0; 
  seconds: number = 0; 
  modTemp: number = 1; 
  modBool: boolean = true; 
  
  constructor(private data: LayerSyncService) { 
  
  }

  ngOnInit() {
    this.data.currentLayer.subscribe(layer => this.layer = layer); 
    this.canvas = <HTMLCanvasElement> document.getElementById("sineCanvas");
    this.unit = 100;  // zoom 
    this.canvas.width = 8000;  // wavelength (inverse)
    this.canvas.height = 300; // amplitude (inverse)
    
    this.context = this.canvas.getContext("2d");
    this.context.font = '18px sans-serif';
    this.context.strokeStyle = '#000';
    this.context.lineJoin = 'round';
    
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    
    this.xAxis = Math.floor(this.height/2);
    this.yAxis = Math.floor(this.width/4);
    
    this.context.save();
    this.draw();
  } 

  
  // wrapper function for recursive drawing via drawel function 
  draw() {
    
    // scope anchor 
    var that = this; 

    function drawel(){
    // Clear the canvas
    that.context.clearRect(0, 0, that.width, that.height);

    // Draw the axes in their own path
    that.context.beginPath();
    that.context.stroke();
    
    // Set styles for animated graphics
    that.context.save();
    that.context.strokeStyle = '#00f';
    that.context.fillStyle = '#fff';
    that.context.lineWidth = 2;

    // Draw the sine curve at time draw.t
    that.context.beginPath();
    that.drawSine(that.t);
    that.context.stroke();
    
    // Restore original styles
    that.context.restore();
    
    // Update the time and draw again
    that.seconds = that.seconds - .05;  // speed 
    that.t = that.seconds*Math.PI;
    setTimeout(drawel, 35);
    }

    drawel();

  };

  drawSine(t) {
    
      // scope anchor 
      var that = this; 

      // Set the initial x and y, starting at 0,0 and translating to the origin on
      // the canvas.
      var x = t; 
      var y = Math.sin(x);
      this.context.moveTo(that.yAxis, that.unit * y + that.xAxis);
      
      // Loop to draw segments
      for (var i = this.yAxis; i <= this.width; i += 1) {
        x = t + (-this.yAxis + i) / this.unit; 

        if(i <=this.width*(17/64)){
        y = Math.sin(x);
        }
        else if (i > this.width*(17/64) && i <=this.width*(18/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(18/64) &&  i <= this.width*(19/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(19/64) &&  i <= this.width*(20/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(20/64) &&  i <= this.width*(21/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(21/64) &&  i <= this.width*(22/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(22/64) &&  i <= this.width*(23/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(23/64) &&  i <= this.width*(24/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(24/64) &&  i <= this.width*(25/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(25/64) &&  i <= this.width*(26/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(26/64) &&  i <= this.width*(27/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(27/64) &&  i <= this.width*(28/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(28/64) &&  i <= this.width*(29/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(29/64) &&  i <= this.width*(30/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(30/64) &&  i <= this.width*(31/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(31/64) &&  i <= this.width*(32/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(32/64) &&  i <= this.width*(33/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(33/64) &&  i <= this.width*(34/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(34/64) &&  i <= this.width*(35/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(35/64) &&  i <= this.width*(36/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(36/64) &&  i <= this.width*(37/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(37/64) &&  i <= this.width*(38/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(38/64) &&  i <= this.width*(39/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(39/64) &&  i <= this.width*(40/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(40/64) &&  i <= this.width*(41/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(41/64) &&  i <= this.width*(42/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(42/64) &&  i <= this.width*(43/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(43/64) &&  i <= this.width*(44/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(44/64) &&  i <= this.width*(45/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(45/64) &&  i <= this.width*(46/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(46/64) &&  i <= this.width*(47/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(47/64) &&  i <= this.width*(48/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(48/64) &&  i <= this.width*(49/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(49/64) &&  i <= this.width*(50/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(50/64) &&  i <= this.width*(51/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(51/64) &&  i <= this.width*(52/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(52/64) &&  i <= this.width*(53/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(53/64) &&  i <= this.width*(54/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(54/64) &&  i <= this.width*(55/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(55/64) &&  i <= this.width*(56/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(56/64) &&  i <= this.width*(57/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(57/64) &&  i <= this.width*(58/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(58/64) &&  i <= this.width*(59/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(59/64) &&  i <= this.width*(60/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(60/64) &&  i <= this.width*(61/64)){
          y = Math.sin(4*x); 
        }
        else if (i > this.width*(61/64) &&  i <= this.width*(62/64)){
          y = Math.sin(x); 
        }
        else if (i > this.width*(62/64) &&  i <= this.width*(63/64)){
          y = Math.sin(2*x); 
        }
        else if (i > this.width*(63/64) &&  i <= this.width*(64/64)){
          y = Math.sin(x); 
        }
        else {
        y = Math.sin(x);       
        }                         
        this.context.lineTo(i, that.unit * y + that.xAxis);
      }
    }
}
