import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user3',
  templateUrl: './user3.component.html',
  styleUrls: ['./user3.component.css']
})
export class User3Component implements OnInit {
  canvas: HTMLCanvasElement;
  ctx:  CanvasRenderingContext2D;

  constructor() { }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('graph');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');
    this.draw();
    this.animate();
  }

  draw() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    // ctx.fillStyle = 'rgba()';
    // Hosts
    ctx.fillRect(50, 400, 100, 100); // left (H1)
    ctx.fillRect(1500, 400, 100, 100); // right (H2)

    // Outside routers
    ctx.fillRect(200, 400, 100, 100); // left (R1)
    ctx.fillRect(1350, 400, 100, 100); // right (R8)

    // Top two routers
    ctx.fillRect(400, 100, 100, 100);  // left (R2)
    ctx.fillRect(1150, 100, 100, 100); // right (R6)

    // Middle two routers
    ctx.fillRect(600, 400, 100, 100); // left (R4)
    ctx.fillRect(950, 400, 100, 100); // right (R5)

    // Botton two routers
    ctx.fillRect(400, 700, 100, 100); // left (R3)
    ctx.fillRect(1150, 700, 100, 100); // right (R7)

    ctx.beginPath();
    // ctx.strokeStyle = 'rgba()';
    // H1 to R1
    ctx.moveTo(150, 450);
    ctx.lineTo(200, 450);
    ctx.stroke();

    // left diamond
    ctx.moveTo(300, 450);
    ctx.lineTo(450, 200); // R1 to R2
    ctx.lineTo(600, 450); // R2 to R4
    ctx.lineTo(450, 700); // R4 to R3
    ctx.lineTo(300, 450); // R3 to R1
    ctx.stroke();

    // R2 to R6
    ctx.moveTo(500, 150);
    ctx.lineTo(1150, 150);
    ctx.stroke();

    // R4 to R5
    ctx.moveTo(700, 450);
    ctx.lineTo(950, 450);
    ctx.stroke();

    // R3 to R7
    ctx.moveTo(500, 750);
    ctx.lineTo(1150, 750);
    ctx.stroke();

    // right diamond
    ctx.moveTo(1050, 450);
    ctx.lineTo(1200, 200); // R5 to R6
    ctx.lineTo(1350, 450); // R6 to R8
    ctx.lineTo(1200, 700); // R8 to R7
    ctx.lineTo(1050, 450); // R7 to R5
    ctx.stroke();

    // R8 to H2
    ctx.moveTo(1450, 450);
    ctx.lineTo(1500, 450);
    ctx.stroke();

    // ctx.fillStyle = '';
    ctx.beginPath();
    ctx.arc(100, 600, 30, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  animate () {
   const that = this;
   let x = 200;
   let y = 200;
   const dx = 2;
   const dy = 1;
   function animateMe() {
    requestAnimationFrame(animateMe); // infinate loop
    that.ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas
    that.draw();  // draw the default graph
    that.animateRedCircle(x, y); // move the circle
    x += dx;
    y += dy;
    console.log('animate test');
   }
   animateMe();
  }
  // takes in x and y coordinates and draws a circle
  animateRedCircle(xPos, yPos) {
    const x = xPos;
    const y = yPos;
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    this.ctx.stroke();
  }
}
