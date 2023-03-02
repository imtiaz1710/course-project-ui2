import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentTopicService {

  constructor() { }

  public currentTopic$: BehaviorSubject<any> = new BehaviorSubject('all');
}
