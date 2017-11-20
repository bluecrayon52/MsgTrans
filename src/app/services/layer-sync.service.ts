import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LayerSyncService {

  private layerSource = new  BehaviorSubject<Object>({name: 'default', message: 'none'});
  currentLayer = this.layerSource.asObservable();

  private whosTurn = new BehaviorSubject(1);
  yourTurn = this.whosTurn.asObservable();

  constructor() { }

  changeLayer(layer: Object) {
    this.layerSource.next(layer);
  }

}

interface Layer {
  name: string;
  message: string;
}

