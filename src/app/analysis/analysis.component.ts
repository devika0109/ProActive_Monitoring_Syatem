import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs/_esm5/observable/timer';
import { Observable } from 'rxjs/observable'


@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  currTime: number;
  obsTimer: Observable<number> = timer(1000, 1000);
  constructor() { }

  ngOnInit() {
     this.obsTimer.subscribe(currTime => this.currTime = currTime);
  }

}
