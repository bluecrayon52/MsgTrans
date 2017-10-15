import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class LayerSyncService {

  private layerSource = new  BehaviorSubject<string>("default")
  currentLayer = this.layerSource.asObservable(); 

  constructor() { }

  changeLayer(layer:string){
    this.layerSource.next(layer)
  }

}

