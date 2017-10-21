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
  
  constructor(private data: LayerSyncService) { 
  
  }

  ngOnInit() {
    this.data.currentLayer.subscribe(layer => this.layer = layer); 
    this.canvas = <HTMLCanvasElement> document.getElementById("sineCanvas");
    this.unit = 50;  // zoom 
    this.canvas.width = 3000;  // wavelength (inverse)
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
    that.seconds = that.seconds - .1;  // speed 
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
      for (var i = this.yAxis; i <= this.width; i += 10) {
        x = t + (-this.yAxis + i) / this.unit;
        y = Math.sin(x);
        this.context.lineTo(i, that.unit * y + that.xAxis);
      }
    }

  
  
}
