import { SearchService } from './../services/searchservice.service';
import { InvoiceEvent } from './../models/search';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Cookies from 'es-cookie';
import { CommonService } from '../services/common.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-filterdetails',
  templateUrl: './filterdetails.component.html',
  styleUrls: ['./filterdetails.component.css']
})

export class FilterdetailsComponent implements OnInit {

  paramUrl: InvoiceEvent[] = [];
  isSpinner: boolean = false;
  showMessage: boolean = false;
  displayedColumns = ['invoiceNum', 'customerNum','createDate', 'ociAckSentFlag'];
  private dataold: InvoiceEvent[];
  public dataSource = new MatTableDataSource<InvoiceEvent>(this.dataold);
  previousUrl: string;
  urlValue: string;

  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  constructor(private _activatedroute:ActivatedRoute,private router:Router,
    private commonservice:CommonService,private searchservice:SearchService) {
      this.previousUrl = commonservice.getPreviousUrl('previousPath');
      this._activatedroute.paramMap.subscribe(params => { 
        this.urlValue = params.get('fvalue'); 
      });
  }

  ngOnInit() {
    this.getInvoiceFilterList();
  }

  getInvoiceFilterList(){
    this.isSpinner = true;
    var empty;
    let copiedData = [];
    if(Cookies.get('SearchRangeQuery'))
    {
      this.searchservice.getInvoiceList(Cookies.get('SearchRangeQuery').toString()).subscribe({
        next:result =>{
          empty = result;
          if(result!=null && result.length>0)
          {
            copiedData = empty;
            let filteredArray = this.commonservice.getFilters(this.urlValue,copiedData);
            this.dataSource = new MatTableDataSource<InvoiceEvent>(filteredArray);
          }
          else{
            this.dataSource = null;
          }
          this.isSpinner = false;
        },
        error: error =>{
          this.isSpinner = false;
          this.showMessage = true;
          console.log(error);
        }
      })
    }
    else
    {
      this.dataSource = null;
      this.isSpinner = false;
      this.showMessage = true;
    }
  }

  ManagePreviousUrl()
  {
    this.commonservice.setPreviousUrl(this.previousUrl);
  }

  gotoDetails(value): void{
    const encodevalue = btoa(value);
    this.router.navigate(['Details',encodevalue]);
  }

}