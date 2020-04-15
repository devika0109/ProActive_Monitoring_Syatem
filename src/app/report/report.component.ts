import { Component, OnInit } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import 'rxjs/add/observable/of';
import { FormControl } from '@angular/forms';

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
  displayedColumns = ['Invoice_Number', 'Processed_Date', 'Incident_Raised'];
  dataSource: MatTableDataSource<Report>;
  raisedValue: string;
  copydataSource: Report[];
  Inct_RaisedFilter = new FormControl();
  nameFilter = new FormControl();
  filteredValues = {
    Inc_Num: '', Processdate: '', Inc_Raised: ''
  };
  globalFilter: any;

  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  ngOnInit(): void {
    this.Inct_RaisedFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['Inc_Raised'] = positionFilterValue;
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
    const myFilterPredicate = (data: Report, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.Inc_Num.toString().trim().toLowerCase().indexOf(this.globalFilter.toLowerCase()) !== -1;
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.Inc_Raised.toString().trim().indexOf(searchString.Inc_Raised) !== -1 &&
        data.Inc_Num.toString().trim().toLowerCase().indexOf(searchString.Inc_Num.toLowerCase()) !== -1;
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