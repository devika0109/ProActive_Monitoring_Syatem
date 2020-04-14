import { Component, OnInit } from '@angular/core';
import{ ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { timer } from 'rxjs/_esm5/observable/timer';

const ELEMENT_DATA: any[] = [
  {Inc_Num: 108172632, Processdate: '10.04.98', Inc_Raised: false},
  {Inc_Num: 227386271, Processdate: '10.04.98', Inc_Raised: true},
  {Inc_Num: 373529188, Processdate: '10.04.98', Inc_Raised: false},
  {Inc_Num: 492737288, Processdate: '10.04.98', Inc_Raised: true},
];

export interface Report{
  Inc_Num : string;
  Processdate: string;
  Inc_Raised : boolean;
}


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  name:string='Report of Missing Invoices';
  showrefresh:boolean=true;
  showlist:boolean=true;
  searchbyinv:boolean=false;
  columnname: string;
  displayedColumns = ['Invoice_Number', 'Processed_Date', 'Incident_Raised'];
  dataSource: MatTableDataSource<Report>;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.filterPredicate = (d: Report, filter: string) => {
      const textToSearch = d[this.columnname] && d[this.columnname].toString().toLowerCase() || '';
      return textToSearch.toString().indexOf(filter) !== -1;
    };
  }

  ngOnInit(): void {
    
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterColumn(value: string){
    this.columnname = value;
  }

  incidentcreated(): void{
    this.name='Report of Invoices with Incident Created';
    this.showrefresh=false;
    this.showlist=true;
    this.searchbyinv=false
  }
  
  reprocessed():void{
    this.name='Report of Reprocessed Invoices';
    this.showrefresh=false;
    this.showlist=true;
    this.searchbyinv=false;
  }

  searchinv():void{
    this.name='Invoice Status';
    this.showlist=false;
    this.searchbyinv=true;
    this.showrefresh=false;
  }

  missing():void{
    this.name='Report of Missing Invoices';
    this.showlist=true;
    this.searchbyinv=false;
    this.showrefresh=false;
  }

}





export class ExampleDataSource extends DataSource<any> {

  connect(): Observable<Element[]> {
    return Observable.of(ELEMENT_DATA);
  }

  disconnect() {}
 }
