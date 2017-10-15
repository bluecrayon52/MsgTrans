import { Component, OnInit } from '@angular/core';
import {LayerSyncService} from '../../services/layer-sync.service';

@Component({
  selector: 'app-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.css']
})

export class SignalComponent implements OnInit {
   
  layer: object; 
  
  constructor(private data: LayerSyncService) { }

  ngOnInit() {
    this.data.currentLayer.subscribe(layer => this.layer = layer)
  } 
}

