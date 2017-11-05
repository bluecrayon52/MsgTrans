import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user3',
  templateUrl: './user3.component.html',
  styleUrls: ['./user3.component.css']
})
export class User3Component implements OnInit {
  canvas: HTMLCanvasElement;
  ctx:  CanvasRenderingContext2D;

  link1 = 0;
  link2 = 0;
  link3 = 0;
  link4 = 0;
  link5 = 0;
  link6 = 0;
  link7 = 0;
  link8 = 0;
  link9 = 0;
  link10 = 0;
  link11 = 0;

  graph: any;

  constructor() { }

  ngOnInit() {
    // init edge weights
    this.link1 = 1 + Math.floor(Math.random() * 7);
    this.link2 = 1 + Math.floor(Math.random() * 7);
    this.link3 = 1 + Math.floor(Math.random() * 7);
    this.link4 = 1 + Math.floor(Math.random() * 7);
    this.link5 = 1 + Math.floor(Math.random() * 7);
    this.link6 = 1 + Math.floor(Math.random() * 7);
    this.link7 = 1 + Math.floor(Math.random() * 7);
    this.link8 = 1 + Math.floor(Math.random() * 7);
    this.link9 = 1 + Math.floor(Math.random() * 7);
    this.link10 = 1 + Math.floor(Math.random() * 7);
    this.link11 = 1 + Math.floor(Math.random() * 7);

    this.graph = {
      start: {A: this.link1, B: this.link2},
      A: {C: this.link3, E: this.link5},
      B: {C: this.link4, F: this.link7},
      C: {A: this.link3, B: this.link4, D: this.link6},
      D: {C: this.link6, E: this.link8, F: this.link9},
      E: {D: this.link8, finish: this.link10},
      F: {D: this.link9, finihs: this.link11},
      finish: {}
    };
    // set up the canvas
    this.canvas = <HTMLCanvasElement> document.getElementById('graph');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    // temp for testing
    this.animateRed();
  }


  dijkstra() {
    
  }

  draw() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    this.ctx.fillStyle = 'black'; // red
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

    // display edge weights
    ctx.font = '30px Arial';
    ctx.fillText(this.link1.toString(), 350, 300);
    ctx.fillText(this.link2.toString(), 350, 600);

    ctx.fillText(this.link3.toString(), 550, 300);
    ctx.fillText(this.link4.toString(), 550, 600);

    ctx.fillText(this.link5.toString(), 800, 125);
    ctx.fillText(this.link6.toString(), 800, 425);
    ctx.fillText(this.link7.toString(), 800, 725);

    ctx.fillText(this.link8.toString(), 1100, 300);
    ctx.fillText(this.link9.toString(), 1100, 600);
    ctx.fillText(this.link10.toString(), 1300, 300);
    ctx.fillText(this.link11.toString(), 1300, 600);
  }

  animateRed() {
   const that = this;
   let x = 100;
   let y = 450;
   const dx = 1;
   let dy = 0;

   function animateMe() {
    requestAnimationFrame(animateMe); // infinate loop
    that.ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas
    that.draw();  // draw the default graph
    that.redCircle(x, y); // draw the circle
    x += dx;

    if (x > 300) {
      dy = that.fromRouter1();
      console.log('dy: ' + dy);
    }
    y += dy;
    console.log('Animate Red');
   }
   animateMe();
  }

  animateBlue() {
    const that = this;
    let bx = 200;
    let by = 600;
    const bdx = 2;
    const bdy = 1;

    function animateMe() {
     requestAnimationFrame(animateMe); // infinate loop
     that.ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas
     that.draw();  // draw the default graph
     that.blueCircle(bx, by); // draw the circle

     bx += bdx;
     by -= bdy;

     console.log('Animate Blue');
    }
    animateMe();
   }

  // takes in x and y coordinates and draws a red filled circle
  redCircle(xPos, yPos) {
    const x = xPos;
    const y = yPos;
    this.ctx.fillStyle = 'red';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.fill();
  }

  // takes in x and y coordinates and draws a blue filled circle
  blueCircle(xPos, yPos) {
    const x = xPos;
    const y = yPos;
    this.ctx.fillStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 30, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.fill();
  }

  fromRouter1() {
    if (this.link1 > this.link2) {
      return (25 / 15);
    } else {
      return (-25 / 15);
    }
  }

}

interface Router {
  pred: number;
  dist: number;
}
