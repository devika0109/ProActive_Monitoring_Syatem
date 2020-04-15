import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import 'rxjs/add/observable/of';
import { FormControl } from '@angular/forms';
import { InvoiceDetails } from '../models/invoicedetails';
import { ReportService } from '../services/report.service';

const ELEMENT_DATA: Report[] = [
  {Inc_Num: "108172632", Processdate: '10.04.98', Inc_Raised: "false"},
  {Inc_Num: "227386271", Processdate: '10.04.98', Inc_Raised: "true"},
  {Inc_Num: "373529188", Processdate: '10.04.98', Inc_Raised: "false"},
  {Inc_Num: "492737288", Processdate: '10.04.98', Inc_Raised: "true"},
];

export interface Report{
  Inc_Num : string;
  Processdate: string;
  Inc_Raised : string;
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
  columnname: string[]= [];
  displayedColumns = ['invoiceNum', 'createdDate', 'incidentRaised'];
  private dataold: InvoiceDetails[];
  dataSource = new MatTableDataSource<InvoiceDetails>(this.dataold);
  raisedValue: string;
  Inct_RaisedFilter = new FormControl();
  nameFilter = new FormControl();
  filteredValues = {
    invoiceNum: '',  incidentRaised: ''
  };
  globalFilter: any;

  constructor(private reportService:ReportService) {
    this.reportService.getInvoiceDetails()
    .subscribe(results => {
      
      this.dataSource = new MatTableDataSource<InvoiceDetails>(results);
      console.log(this.dataSource.data);
    });
    if(this.dataSource.data.length>0)
    {
      this.dataSource.filterPredicate = this.customFilterPredicate();
    }
  }

  ngOnInit(): void {
    this.Inct_RaisedFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['incidentRaised'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  applyFilter(filter: string) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  filterColumn(value: string, index: number){
    this.columnname[index] = value;
  }

  customFilterPredicate() {
    const myFilterPredicate = (data: InvoiceDetails, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.invoiceNum.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.incidentRaised.toString().trim().indexOf(searchString.incidentRaised) !== -1 &&
        data.invoiceNum.toString().trim().toLowerCase().indexOf(searchString.invoiceNum.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }

  resetFilters()
  {
    this.globalFilter='';
    this.raisedValue = '';
    this.filteredValues['Inc_Raised'] = '';
    this.filteredValues['Inc_Num'] = '';
    this.dataSource.filter = '';
  }
}