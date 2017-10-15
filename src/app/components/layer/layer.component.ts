import { Component, OnInit, Input } from '@angular/core';
import {LayerSyncService} from '../../services/layer-sync.service';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.css']
})
export class LayerComponent implements OnInit {

  layer: string; 

  constructor(private data: LayerSyncService) { }

  ngOnInit() {
    this.data.currentLayer.subscribe(layer => this.layer = layer)
  }
}
