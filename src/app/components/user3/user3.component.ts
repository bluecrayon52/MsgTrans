import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LayerSyncService } from '../../services/layer-sync.service';

@Component({
  selector: 'app-user3',
  templateUrl: './user3.component.html',
  styleUrls: ['./user3.component.css']
})
export class User3Component implements OnInit {

  run: boolean;
  rSet: boolean;
  signal: boolean;

  layer: any; // keep track of layer engagement across components

  canvas: HTMLCanvasElement;
  ctx:  CanvasRenderingContext2D;

  links = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // edge weights for the red b all

  linksB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  // edge weights for the blue ball

  // normalized edge weights where 3, 4, 5, 6, 7 become 3, 5, 8, 10, 13
  // Red
  weights = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  // Blue
  weightsB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];


  graph: any;
  graphB: any;  // blue

  solution: any;
  solutionB: any; // blue

  path: string[];
  pathB: string[]; // blue

  xPath: number[];
  yPath: number[]; // blue

  xPathB: number[];
  yPathB: number[]; // blue

  constructor(private data: LayerSyncService) { }

  ngOnInit() {

    this.run = true;
    this.rSet = false;
   // this.signal = false;
    this.data.currentLayer.subscribe(layer => this.layer = layer); // subscribe to the service

    // init graph edge weights
    this.graphSet();
    this.setWeights();

    // set up the canvas
    this.canvas = <HTMLCanvasElement> document.getElementById('graph');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    // temp for testing-----------------------------------------
    this.draw();

    // set the path for the red ball
    this.solution = this.dijkstra(this.graph, 'start');
    this.path = this.solution['finish'];
    this.setSeq();

    // set the path for the blue ball
    this.solutionB = this.dijkstra(this.graphB, 'start');
    this.pathB = this.solutionB['finish'];
    this.setSeqB();

    // this.animateBalls();
  }

  reset() {
    this.signal = true;
    this.graphSet();
    this.setWeights();
    this.draw();

    this.solution = this.dijkstra(this.graph, 'start');
    this.path = this.solution['finish'];
    this.setSeq();

    // set the path for the blue ball
    this.solutionB = this.dijkstra(this.graphB, 'start');
    this.pathB = this.solutionB['finish'];
    this.setSeqB();
    this.animateBalls();
  }

  graphSet() {

    for ( let i = 0; i < 11; i++) {
      this.links[i] = 1 + Math.floor(Math.random() * 7);
      this.linksB[i] = 1 + Math.floor(Math.random() * 7);
      // this.links[i] = 7;
      // this.linksB[i] = 7;
    }

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
      start: {A: this.links[0], B: this.links[1]},
      A: {C: this.links[2], E: this.links[4]},
      B: {C: this.links[3], F: this.links[6]},                // bidirectional from (A, C), (C, A) & (B, C), (C, B)
      C: {A: this.links[2], B: this.links[3], D: this.links[5]}, // bidirectional from (C, D), (D, C)
      D: {C: this.links[5], E: this.links[7], F: this.links[8]}, // bidirectional from (E, D), (D, E) & (F, D), (D, F)
      E: {D: this.links[7], finish: this.links[9]},
      F: {D: this.links[8], finish: this.links[10]},
      finish: {}
    };

    this.graphB = {
      start: {A: this.linksB[0], B: this.linksB[1]},
      A: {C: this.linksB[2], E: this.linksB[4]},
      B: {C: this.linksB[3], F: this.linksB[6]},                // bidirectional from (A, C), (C, A) & (B, C), (C, B)
      C: {A: this.linksB[2], B: this.linksB[3], D: this.linksB[5]}, // bidirectional from (C, D), (D, C)
      D: {C: this.linksB[5], E: this.linksB[7], F: this.linksB[8]}, // bidirectional from (E, D), (D, E) & (F, D), (D, F)
      E: {D: this.linksB[7], finish: this.linksB[9]},
      F: {D: this.linksB[8], finish: this.linksB[10]},
      finish: {}
    };

  }

  setWeights() {
    for (let i = 0; i < 11; i++) {
      switch (this.links[i]) {
        case 3: this.weights[i] = 5 / 4;
        break;
        case 4: this.weights[i] =  1;
        break;
        case 5: this.weights[i] = 5 / 8;
        break;
        case 6: this.weights[i] = 1 / 2;
        break;
        case 7: this.weights[i] = 5 / 16;
        break;
        default: this.weights[i] = 5 / this.links[i];
      }
      switch (this.linksB[i]) {
        case 3: this.weightsB[i] = 5 / 4;
        break;
        case 4: this.weightsB[i] =  1;
        break;
        case 5: this.weightsB[i] = 5 / 8;
        break;
        case 6: this.weightsB[i] = 1 / 2;
        break;
        case 7: this.weightsB[i] = 5 / 16;
        break;
        default: this.weightsB[i] = 5 / this.linksB[i];
      }
    }
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
    ctx.font = '30px Arial ';
    ctx.fillStyle = 'red';
    ctx.fillText(this.links[0].toString(), 310, 300);
    ctx.fillText(this.links[1].toString(), 310, 600);

    ctx.fillText(this.links[2].toString(), 535, 300);
    ctx.fillText(this.links[3].toString(), 535, 600);

    ctx.fillText(this.links[4].toString(), 785, 175);
    ctx.fillText(this.links[5].toString(), 785, 425);
    ctx.fillText(this.links[6].toString(), 785, 675);

    ctx.fillText(this.links[7].toString(), 1060, 300);
    ctx.fillText(this.links[8].toString(), 1060, 600);

    ctx.fillText(this.links[9].toString(), 1285, 300);
    ctx.fillText(this.links[10].toString(), 1285, 600);

    ctx.fillStyle = 'black';
    ctx.fillText('(   /   )', 300, 300);
    ctx.fillText('(   /   )', 300, 600);

    ctx.fillText('(   /   )', 525, 300);
    ctx.fillText('(   /   )', 525, 600);

    ctx.fillText('(   /   )', 775, 175);
    ctx.fillText('(   /   )', 775, 425);
    ctx.fillText('(   /   )', 775, 675);

    ctx.fillText('(   /   )', 1050, 300);
    ctx.fillText('(   /   )', 1050, 600);

    ctx.fillText('(   /   )', 1275, 300);
    ctx.fillText('(   /   )', 1275, 600);

    ctx.fillStyle = 'blue';
    ctx.fillText(this.linksB[0].toString(), 350, 300);
    ctx.fillText(this.linksB[1].toString(), 350, 600);

    ctx.fillText(this.linksB[2].toString(), 575, 300);
    ctx.fillText(this.linksB[3].toString(), 575, 600);

    ctx.fillText(this.linksB[4].toString(), 825, 175);
    ctx.fillText(this.linksB[5].toString(), 825, 425);
    ctx.fillText(this.linksB[6].toString(), 825, 675);

    ctx.fillText(this.linksB[7].toString(), 1100, 300);
    ctx.fillText(this.linksB[8].toString(), 1100, 600);

    ctx.fillText(this.linksB[9].toString(), 1325, 300);
    ctx.fillText(this.linksB[10].toString(), 1325, 600);

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
          this.xPath.push(this.weights[0]);
          this.yPath.push((-5 / 3)  * this.weights[0]);
        } else if (prev === 'C') {
          this.xPath.push(- this.weights[2]);
          this.yPath.push((-5 / 3) * this.weights[2]);
          }

      } else if (next === 'B') {
        if (prev === 'start') {
          this.xPath.push(this.weights[1]);
          this.yPath.push((5 / 3) * this.weights[1]);
        } else if (prev === 'C') {
          this.xPath.push(- this.weights[3]);
          this.yPath.push((5 / 3) * this.weights[3]);
          }

      } else if (next === 'C') {
        if (prev === 'A') {
          this.xPath.push(this.weights[2]);
          this.yPath.push((5 / 3) * this.weights[2]);
        } else if (prev === 'B') {
          this.xPath.push(this.weights[3]);
          this.yPath.push((-5 / 3) * this.weights[3]);

        } else if (prev === 'D') {
          this.xPath.push(- this.weights[5]);
          this.yPath.push(0);
          }

      } else if (next === 'D') {
        if (prev === 'C') {
          this.xPath.push(this.weights[5]);
          this.yPath.push(0);
        } else if (prev === 'E') {
          this.xPath.push(- this.weights[7]);
          this.yPath.push((5 / 3) * this.weights[7]);
        } else if (prev === 'F') {
          this.xPath.push(- this.weights[8]);
          this.yPath.push((-5 / 3) * this.weights[8]);
          }

      } else if (next === 'E') {
        if (prev === 'A') {
          this.xPath.push(this.weights[4]);
          this.yPath.push(0);
          this.xPath.push(this.weights[4]); // padding
          this.yPath.push(0);
          this.xPath.push(this.weights[4]);
          this.yPath.push(0);
        } else if (prev === 'D') {
          this.xPath.push(this.weights[7]);
          this.yPath.push((-5 / 3) * this.weights[7]);
          }

      } else if (next === 'F') {
        if (prev === 'B') {
          this.xPath.push(this.weights[6]);
          this.yPath.push(0);
          this.xPath.push(this.weights[6]); // padding
          this.yPath.push(0);
          this.xPath.push(this.weights[6]);
          this.yPath.push(0);
        } else if (prev === 'D') {
          this.xPath.push(this.weights[8]);
          this.yPath.push((5 / 3) * this.weights[8]);
          }

      } else if (next === 'finish') {
        if (prev === 'E') {
          this.xPath.push(this.weights[9]);
          this.yPath.push((5 / 3) * this.weights[9]);
        } else if (prev === 'F') {
          this.xPath.push(this.weights[10]);
          this.yPath.push((-5 / 3) * this.weights[10]);
        }

      }
      prev = next;
    }
    this.xPath.reverse();
    this.yPath.reverse();
  }

  setSeqB() {
     // reset the path arrays
     this.xPathB = [];
     this.yPathB = [];

     // init prev
     let prev = 'start';

     for (const next of this.pathB) {

       if (next === 'A') {
         if (prev === 'start') {
           this.xPathB.push(this.weightsB[0]);
           this.yPathB.push((-5 / 3)  * this.weightsB[0]);
         } else if (prev === 'C') {
           this.xPathB.push(- this.weightsB[2]);
           this.yPathB.push((-5 / 3) * this.weightsB[2]);
           }

       } else if (next === 'B') {
         if (prev === 'start') {
           this.xPathB.push(this.weightsB[1]);
           this.yPathB.push((5 / 3) * this.weightsB[1]);
         } else if (prev === 'C') {
           this.xPathB.push(- this.weightsB[3]);
           this.yPathB.push((5 / 3) * this.weightsB[3]);
           }

       } else if (next === 'C') {
         if (prev === 'A') {
           this.xPathB.push(this.weightsB[2]);
           this.yPathB.push((5 / 3) * this.weightsB[2]);
         } else if (prev === 'B') {
           this.xPathB.push(this.weightsB[3]);
           this.yPathB.push((-5 / 3) * this.weightsB[3]);

         } else if (prev === 'D') {
           this.xPathB.push(- this.weightsB[5]);
           this.yPathB.push(0);
           }

       } else if (next === 'D') {
         if (prev === 'C') {
           this.xPathB.push(this.weightsB[5]);
           this.yPathB.push(0);
         } else if (prev === 'E') {
           this.xPathB.push(- this.weightsB[7]);
           this.yPathB.push((5 / 3) * this.weightsB[7]);
         } else if (prev === 'F') {
           this.xPathB.push(- this.weightsB[8]);
           this.yPathB.push((-5 / 3) * this.weightsB[8]);
           }

       } else if (next === 'E') {
         if (prev === 'A') {
           this.xPathB.push(this.weightsB[4]);
           this.yPathB.push(0);
           this.xPathB.push(this.weightsB[4]); // padding
           this.yPathB.push(0);
           this.xPathB.push(this.weightsB[4]);
           this.yPathB.push(0);
         } else if (prev === 'D') {
           this.xPathB.push(this.weightsB[7]);
           this.yPathB.push((-5 / 3) * this.weightsB[7]);
           }

       } else if (next === 'F') {
         if (prev === 'B') {
           this.xPathB.push(this.weightsB[6]);
           this.yPathB.push(0);
           this.xPathB.push(this.weightsB[6]); // padding
           this.yPathB.push(0);
           this.xPathB.push(this.weightsB[6]);
           this.yPathB.push(0);
         } else if (prev === 'D') {
           this.xPathB.push(this.weightsB[8]);
           this.yPathB.push((5 / 3) * this.weightsB[8]);
           }

       } else if (next === 'finish') {
         if (prev === 'E') {
           this.xPathB.push(this.weightsB[9]);
           this.yPathB.push((5 / 3) * this.weightsB[9]);
         } else if (prev === 'F') {
           this.xPathB.push(this.weightsB[10]);
           this.yPathB.push((-5 / 3) * this.weightsB[10]);
         }

       }
       prev = next;
     }
     this.xPathB.reverse();
     this.yPathB.reverse();
  }

  animateBalls() {
   const that = this;
   that.run = false;
   that.rSet = false;
   that.signal = true;
   // red circle vars
   let x = 150;
   let y = 450;
   let dx = 1;
   let dy = 0;

   // blue circle vars
   let xB = 150;
   let yB = 450;
   let dxB = 1;
   let dyB = 0;

   function animateMe() {
    requestAnimationFrame(animateMe); // infinate loop
    that.ctx.clearRect(0, 0, innerWidth, innerHeight); // clear the canvas
    that.draw();  // draw the default graph
    that.redCircle(x, y); // draw the circle
    that.blueCircle(xB, yB); // draw the blue circle

    // red circle path modulation
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

    // blue circle path modulation
    if (xB === 300) {
      dxB = that.xPathB.pop();
      dyB = that.yPathB.pop();

    } else if (xB === 450) {
      dxB = that.xPathB.pop();
      dyB = that.yPathB.pop();

    } else if (xB === 600) {
      dxB = that.xPathB.pop();
      dyB = that.yPathB.pop();

    } else if (xB === 1050) {
      dxB = that.xPathB.pop();
      dyB = that.yPathB.pop();

    } else if (xB === 1200) {
      dxB = that.xPathB.pop();
      dyB = that.yPathB.pop();

    } else if (xB === 1350) {
      dxB = 1;
      dyB = 0;

    } else if (xB === 1500) {
      dxB = 0;
      dyB = 0;
    }

    if (x === 1500 && xB === 1500) {
      that.rSet = true;
      that.signal = false;
    }

    xB += dxB;
    yB += dyB;
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
    this.ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    this.ctx.stroke();
    this.ctx.fill();
  }

}

interface Layer {
  name: string;
  message: string;
}
