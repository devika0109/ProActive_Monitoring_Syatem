import { InvoiceEvent } from './../models/search';
import { CommonService } from './../services/common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './../services/searchservice.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import * as Cookies from 'es-cookie';
import { Chart } from 'chart.js'

const cookietype: string = 'rangeList1';

@Component({
  selector: 'app-rangelist',
  templateUrl: './rangelist.component.html',
  styleUrls: ['./rangelist.component.css']
})

export class RangelistComponent implements OnInit {
  private searchparam: string;
  private validationpassCount: number;
  private deliveredcount: number;
  private countValues: any;
  private dataold: InvoiceEvent[];
  private dataSource = new MatTableDataSource<InvoiceEvent>(this.dataold);

  displayedColumns = ['invoiceNum', 'customerNum','createDate', 'ociAckSentFlag'];
  showspinner: boolean;
  showChart: boolean = true;
  showlist: boolean;
  displaymessage: boolean;
  private canvas: any;
  private ctx: any;
  private mypiechart: any;
  listdata: InvoiceEvent[] = [];


  @ViewChild(MatPaginator) 
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }
  
  constructor(private searchser: SearchService,private _activatedroute:ActivatedRoute,
    private route:Router,private commonSer: CommonService) {
      
  }

  ngOnInit() {
    this._activatedroute.paramMap.subscribe(params => { 
      this.searchparam = params.get('sdata'); 
      this.searchparam = atob(this.searchparam);
    });

    Cookies.set('SearchRangeQuery',this.searchparam);

    if(Cookies.get('previousPath') === '/Search' ){
      this.commonSer.createpreviousUrl('previousPath','DateRangeList/'+this.searchparam);
      this.TogetInvoiceList(this.searchparam);
    }
    else
    {
      //this.commonSer.createpreviousUrl('previousPath');
      //this.getInvoiceListData(this.searchparam);
      this.TogetInvoiceList(this.searchparam);
    }
  }

  TogetInvoiceList(data){
    let copiedData = [];
    var empty;
    this.showspinner = true;
    this.searchser.getInvoiceList(data).subscribe(
      {
        next: result => {
          empty = result;
          if(result!=null && result.length>0)
          {
            copiedData = empty;
            this.listdata = copiedData;
            this.dataSource = new MatTableDataSource<InvoiceEvent>(copiedData);
            // localStorage.setItem(cookietype,JSON.stringify(copiedData.slice(0,copiedData.length/7)));
            this.displaymessage = false;
            this.showlist = true;
            this.showspinner = false;
            const countobservable = this.commonSer.getCountValues(copiedData);
            countobservable.subscribe((result)=>{
              this.countValues = result,
              // console.log(this.countValues);   
              this.intializeRangePieChartData(this.countValues);
            });
          }
          else
          {
            this.displaymessage = true;
            this.showspinner = false;
            this.showChart = false;
          }
        },
        error: err =>{
          this.showspinner = false;
          this.displaymessage = true;
          console.log(err);
        }
      }
    )
  }

  getInvoiceListData(data): void{
    let copiedData = [];
    var empty;
    this.showspinner = true;
    if(localStorage.getItem(cookietype))
    {
      copiedData = JSON.parse(localStorage.getItem(cookietype));
      this.listdata = copiedData;
      this.displaymessage = false;
      this.showlist = true;
      this.showspinner = false;
      this.dataSource = new MatTableDataSource<InvoiceEvent>(copiedData);
      const countobservable = this.commonSer.getCountValues(copiedData);
      countobservable.subscribe((result)=>{
        this.countValues = result,
        // console.log(this.countValues);   
        this.intializeRangePieChartData(this.countValues);
      });
    }
    else{
      this.TogetInvoiceList(data);
    }
  }

  getCountValues(object: any[]): void{
    let Newobject: InvoiceEvent[] = object;
    let vcounter: number = 0;
    let dcounter: number = 0;
    if(Newobject !=null)
    {
      for(let i=0;i<Newobject.length;i++)
      {
        if(Newobject[i].sLayerEvents != null)
        {
          for(let j=0;j<Newobject[i].sLayerEvents.length;j++)
          {
            if(Newobject[i].sLayerEvents[j].state === 'VALIDATION_PASSED')
            {
              this.validationpassCount = vcounter++;
            }
            else if(Newobject[i].sLayerEvents[j].state === 'DELIVERED')
            {
              this.deliveredcount = dcounter++;
            }
          }
        }
      }
    }
    
  }

  gotoDetails(value): void{
    const encodevalue = btoa(value);
    this.route.navigate(['Details',encodevalue]);
  }

  intializeRangePieChartData(valueObj: any): void{
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [ "Validation Failed", "Delivered", "Validation Passed"],
        datasets: [{
          label: "",
          backgroundColor: [ "#c45850","#3e95cd","#8e5ea2"],
          data: [valueObj.validationFailedCount,valueObj.Deliveredcount,valueObj.ValidationCount]
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Invoive Process'
        }
      }
    });
    this.mypiechart = myChart;
  }

  pieChartClick(e)
  {
    var slice = this.mypiechart.getElementAtEvent(e);
    if (!slice.length) return; // return if not clicked on slice
    var label = slice[0]._index;
    switch (label) {
        // add case for each label/slice
      case 0:
        window.alert('clicked on Validation failed');
        this.route.navigate(['FilterDetails','VALIDATION_FAILED'])
        break;
      case 1:
        window.alert('clicked on Delivered');
        this.route.navigate(['FilterDetails','DELIVERED'])
        break;
      case 2:
        window.alert('clicked on Validation Passed');
        this.route.navigate(['FilterDetails','VALIDATION_PASSED'])
        break;
    }
  }
}
