import { Component, OnInit } from '@angular/core';
import{ ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { timer } from 'rxjs/_esm5/observable/timer';



@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
  export class ReportComponent  {

    name:string='Report of Missing Invoices';
    showrefresh:boolean=true;
    showlist:boolean=true;
    searchbyinv:boolean=false;
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

 @ViewChild(MatPaginator) paginator: MatPaginator;

  columns = [
    { columnDef: 'Invoice Number', header: 'Invoice Number',    cell: (element: any) => `${element.invoice}` },
    { columnDef: 'Date',   header: 'Date', cell: (element: any) => `${element.date}`   },
    { columnDef: 'Time of Creation',     header: 'Time of Creation',   cell: (element: any) => `${element.toa}`     },


  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSource = new ExampleDataSource();



          constructor() {
          }


}


const ELEMENT_DATA: any[] = [
  {invoice: 108172632, toa: '10 AM', date: '10.04.98'},
  {invoice: 227386271, toa: '10 AM', date: '10.04.98'},
  {invoice: 373529188, toa: '10 AM', date: '10.04.98'},
  {invoice: 492737288, toa: '10 AM', date: '10.04.98'},



];


export class ExampleDataSource extends DataSource<any> {

  connect(): Observable<Element[]> {
    return Observable.of(ELEMENT_DATA);
  }

  disconnect() {}
 }
