import { ColumnNames, SLayerEvent } from './../../models/search';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-commontable',
  templateUrl: './commontable.component.html',
  styleUrls: ['./commontable.component.css']
})
export class CommontableComponent implements OnInit {

  @Input() displayedColumns : ColumnNames[];  
  @Input() dataSource : SLayerEvent[];
  columnsToDisplay: any[];

  constructor() { }

  ngOnInit() {
    this.columnsToDisplay = this.displayedColumns.map(col => col.name);
  }

}
