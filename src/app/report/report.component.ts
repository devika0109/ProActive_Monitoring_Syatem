import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';
import { FormControl } from '@angular/forms';
import { InvoiceDetails } from '../models/invoicedetails';
import { ReportService } from '../services/report.service';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})


export class ReportComponent implements OnInit {

  name:string='Report of Missing Invoices';
  showProgressbar:boolean = false;
  private source = interval(3600000);
  raisedValue: string;
  reprocessedValue: string;

  // MatTable Columns to be displayed
  displayedColumns = ['invoiceNum', 'createdDate', 'incidentRaised', 'invoiceReprocessed'];

  // Filtering , Paginator and Sroting Variables for MatTable
  private dataold: InvoiceDetails[];
  dataSource = new MatTableDataSource<InvoiceDetails>(this.dataold);
  Inct_RaisedFilter = new FormControl();
  Inct_ReprocessedFilter = new FormControl();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  filteredValues = {
    invoiceNum: '',  incidentRaised: '', invoiceReprocessed: ''
  };
  globalFilter: any;

  // constuctor
  constructor(private reportService:ReportService) {
    this.source.subscribe(() => {
      this.loadData();
    });
  }

  ngAfterViewInit() {
    this.loadData();
  }

  ngOnInit(): void {
    this.showProgressbar = true;
    this.Inct_RaisedFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['incidentRaised'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.Inct_ReprocessedFilter.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['invoiceReprocessed'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  }

  // Filter Funation
  applyFilter(filter: string) {
    this.globalFilter = filter;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
  }

  //Filter Predicate Function
  customFilterPredicate() {
    const myFilterPredicate = (data: InvoiceDetails, filter: string): boolean => {
      var globalMatch = !this.globalFilter;

      if (this.globalFilter) {
        // search all text fields
        globalMatch = data.invoiceNum.toString().trim().toLowerCase().startsWith(this.globalFilter.toLowerCase(),0);
      }

      if (!globalMatch) {
        return;
      }

      let searchString = JSON.parse(filter);
      return data.incidentRaised.toString().trim().indexOf(searchString.incidentRaised) !== -1 &&
        data.invoiceNum.toString().trim().toLowerCase().indexOf(searchString.invoiceNum.toLowerCase()) !== -1 &&
        data.invoiceReprocessed.toString().trim().toLowerCase().indexOf(searchString.invoiceReprocessed.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }

  loadData(): void{
    this.showProgressbar = true;
    this.reportService.getInvoiceDetails()
    .subscribe(results => {
      this.dataSource = new MatTableDataSource<InvoiceDetails>(results);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.customFilterPredicate();
      this.showProgressbar = false;
    });
  }

  refreshData(): void{
    this.dataSource = new MatTableDataSource();
    this.loadData();
  }

  resetFilters()
  {
    this.globalFilter='';
    this.raisedValue = '';
    this.reprocessedValue = '';
    this.filteredValues['incidentRaised'] = '';
    this.filteredValues['invoiceNum'] = '';
    this.filteredValues['invoiceReprocessed'] = '';
    this.dataSource.filter = '';
  }

}