import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LayerSyncService {

  private layerSource = new  BehaviorSubject<object>({name: 'default', message: 'none'});
  currentLayer = this.layerSource.asObservable();

  constructor() { }

  changeLayer(layer: object) {
    this.layerSource.next(layer);
  }

}

