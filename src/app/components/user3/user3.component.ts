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
  solution: any;
  path: string[];

  xPath: number[];
  yPath: number[];

  constructor() { }

  ngOnInit() {

    // init graph edge weights
    this.graphSet();

    // set up the canvas
    this.canvas = <HTMLCanvasElement> document.getElementById('graph');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    // temp for testing
    // this.draw();

    this.solution = this.dijkstra(this.graph, 'start');
    this.path = this.solution['finish'];
    this.setSeq();
    // this.animateRed();
    this.animateBlue();
  }

  graphSet() {
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

    // Test complex weight pattern
    // this.link1 = 1;
    // this.link2 = 10;
    // this.link3 = 10;
    // this.link4 = 1;
    // this.link5 = 1;
    // this.link6 = 1;
    // this.link7 = 1;
    // this.link8 = 1;
    // this.link9 = 10;
    // this.link10 = 10;
    // this.link11 = 1;

    this.graph = {
      start: {A: this.link1, B: this.link2},
      A: {C: this.link3, E: this.link5},
      B: {C: this.link4, F: this.link7},                // bidirectional from (A, C), (C, A) & (B, C), (C, B)
      C: {A: this.link3, B: this.link4, D: this.link6}, // bidirectional from (C, D), (D, C)
      D: {C: this.link6, E: this.link8, F: this.link9}, // bidirectional from (E, D), (D, E) & (F, D), (D, F)
      E: {D: this.link8, finish: this.link10},
      F: {D: this.link9, finish: this.link11},
      finish: {}
    };

  }

// source reference: https://gist.github.com/jpillora/7382441
// dijkstra solve graph starting at s
dijkstra(graph, s) {
  const solutions = {};
  solutions[s] = [];
  solutions[s].dist = 0;

  while (true) {
    let parent = null;
    let nearest = null;
    let dist = Infinity;

    // for each existing solution
    for (const n in solutions) {
      if (!solutions[n]) { continue; }

      const ndist = solutions[n].dist;
      const adj = graph[n];

      // for each of its adjacent nodes...
      for (const a in adj) {
        // without a solution already...
        if (solutions[a]) { continue; }
        // choose nearest node with lowest *total* cost
        const d = adj[a] + ndist;
        if (d < dist) {
          // reference parent
          parent = solutions[n];
          nearest = a;
          dist = d;
        }
      }
    }
    // no more solutions
    if (dist === Infinity) {
        break;
    }
    // extend parent's solution path
    solutions[nearest] = parent.concat(nearest);
    // extend parent's cost
    solutions[nearest].dist = dist;
  }
  return solutions;
}

  // draws default layout and random edge weights
  draw() {
    const canvas = this.canvas;
    const ctx = this.ctx;

    this.ctx.fillStyle = 'black'; // red
    // Hosts
    ctx.fillRect(100, 400, 100, 100); // left (H1)
    ctx.fillRect(1450, 400, 100, 100); // right (H2)

    // Outside routers
    ctx.fillRect(250, 400, 100, 100); // left (start)
    ctx.fillRect(1300, 400, 100, 100); // right (finish)

    // Top two routers
    ctx.fillRect(400, 150, 100, 100);  // left (A)
    ctx.fillRect(1150, 150, 100, 100); // right (E)

    // Middle two routers
    ctx.fillRect(550, 400, 100, 100); // left (C)
    ctx.fillRect(1000, 400, 100, 100); // right (D)

    // Botton two routers
    ctx.fillRect(400, 650, 100, 100); // left (B)
    ctx.fillRect(1150, 650, 100, 100); // right (F)

    ctx.beginPath();

    // H1 to start
    ctx.moveTo(200, 450);
    ctx.lineTo(250, 450);
    ctx.stroke();

    // left diamond
    ctx.moveTo(300, 450);
    ctx.lineTo(450, 200); // start to A
    ctx.lineTo(600, 450); // A to C
    ctx.lineTo(450, 700); // C to B
    ctx.lineTo(300, 450); // B to start
    ctx.stroke();

    // A to E
    ctx.moveTo(500, 200);
    ctx.lineTo(1150, 200);
    ctx.stroke();

    // C to D
    ctx.moveTo(650, 450);
    ctx.lineTo(1000, 450);
    ctx.stroke();

    // B to F
    ctx.moveTo(500, 700);
    ctx.lineTo(1150, 700);
    ctx.stroke();

    // right diamond
    ctx.moveTo(1050, 450);
    ctx.lineTo(1200, 200); // D to E
    ctx.lineTo(1350, 450); // E to finish
    ctx.lineTo(1200, 700); // finish to F
    ctx.lineTo(1050, 450); // F to D
    ctx.stroke();

    // finish to H2
    ctx.moveTo(1400, 450);
    ctx.lineTo(1450, 450);
    ctx.stroke();

    // display edge weights
    ctx.font = '30px Arial';
    ctx.fillText(this.link1.toString(), 350, 300);
    ctx.fillText(this.link2.toString(), 350, 600);

    ctx.fillText(this.link3.toString(), 550, 300);
    ctx.fillText(this.link4.toString(), 550, 600);

    ctx.fillText(this.link5.toString(), 800, 175);
    ctx.fillText(this.link6.toString(), 800, 425);
    ctx.fillText(this.link7.toString(), 800, 675);

    ctx.fillText(this.link8.toString(), 1100, 300);
    ctx.fillText(this.link9.toString(), 1100, 600);
    ctx.fillText(this.link10.toString(), 1300, 300);
    ctx.fillText(this.link11.toString(), 1300, 600);
  }
  setSeq() {

    // reset the path arrays
    this.xPath = [];
    this.yPath = [];

    // init prev
    let prev = 'start';

    for (const next of this.path) {

      if (next === 'A') {
        if (prev === 'start') {
          this.xPath.push(1);
          this.yPath.push(-25 / 15);
        } else if (prev === 'C') {
          this.xPath.push(-1);
          this.yPath.push(-25 / 15);
          }

      } else if (next === 'B') {
        if (prev === 'start') {
          this.xPath.push(1);
          this.yPath.push(25 / 15);
        } else if (prev === 'C') {
          this.xPath.push(-1);
          this.yPath.push(25 / 15);
          }

      } else if (next === 'C') {
        if (prev === 'A') {
          this.xPath.push(1);
          this.yPath.push(25 / 15);
        } else if (prev === 'B') {
          this.xPath.push(1);
          this.yPath.push(-25 / 15);

        } else if (prev === 'D') {
          this.xPath.push(-1);
          this.yPath.push(0);
          }

      } else if (next === 'D') {
        if (prev === 'C') {
          this.xPath.push(1);
          this.yPath.push(0);
        } else if (prev === 'E') {
          this.xPath.push(-1);
          this.yPath.push(25 / 15);
        } else if (prev === 'F') {
          this.xPath.push(-1);
          this.yPath.push(-25 / 15);
          }

      } else if (next === 'E') {
        if (prev === 'A') {
          this.xPath.push(1);
          this.yPath.push(0);
          this.xPath.push(1); // padding
          this.yPath.push(0);
          this.xPath.push(1);
          this.yPath.push(0);
        } else if (prev === 'D') {
          this.xPath.push(1);
          this.yPath.push(-25 / 15);
          }

      } else if (next === 'F') {
        if (prev === 'B') {
          this.xPath.push(1);
          this.yPath.push(0);
          this.xPath.push(1); // padding
          this.yPath.push(0);
          this.xPath.push(1);
          this.yPath.push(0);
        } else if (prev === 'D') {
          this.xPath.push(1);
          this.yPath.push(25 / 15);
          }

      } else if (next === 'finish') {
        if (prev === 'E') {
          this.xPath.push(1);
          this.yPath.push(25 / 15);
        } else if (prev === 'F') {
          this.xPath.push(1);
          this.yPath.push(-25 / 15);
        }

      }
      prev = next;
    }
    this.xPath.reverse();
    this.yPath.reverse();
    console.log('path: ' + this.path);
    console.log('xPath: ' + this.xPath);
    console.log('yPath: ' + this.yPath);
  }

  animateRed() {
   const that = this;
   let x = 150;
   let y = 450;
   let dx = 1;
   let dy = 0;

   function animateMe() {
    requestAnimationFrame(animateMe); // infinate loop
    that.ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas
    that.draw();  // draw the default graph
    that.redCircle(x, y); // draw the circle

    if (x === 300) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 450) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 600) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 1050) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 1200) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 1350) {
      dx = 1;
      dy = 0;

    } else if (x === 1500) {
      dx = 0;
      dy = 0;
    }

    x += dx;
    y += dy;
    console.log('Animate Red');
   }
   animateMe();
  }

  animateBlue() {
    const that = this;
    let x = 150;
    let y = 450;
    let dx = 1;
    let dy = 0;

    function animateMe() {
     requestAnimationFrame(animateMe); // infinate loop
     that.ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas
     that.draw();  // draw the default graph
     that.blueCircle(x, y); // draw the circle

     if (x === 300) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 450) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 600) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 1050) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 1200) {
      dx = that.xPath.pop();
      dy = that.yPath.pop();

    } else if (x === 1350) {
      dx = 1;
      dy = 0;

    } else if (x === 1500) {
      dx = 0;
      dy = 0;
    }

    x += dx;
    y += dy;

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

}
