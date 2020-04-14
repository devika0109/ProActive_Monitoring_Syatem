import { CommonService } from './../services/common.service';
import { InvoiceEvent, SlayerCountObject } from './../models/search';
import { SearchService } from './../services/searchservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})

export class SearchformComponent implements OnInit {

  name: string = 'Invoice Events Search';
  private finalsearchType: string;

  // Boolean Values
  showform: boolean = false;
  showlist: boolean = false;
  displaymessage: boolean = false;
  showdetails : boolean = false;
  showspinner: boolean = false;
  showchartspin: boolean = false;
  showrightGraph: boolean = false;

  dataold: InvoiceEvent[];
  dataSource = new MatTableDataSource<InvoiceEvent>(this.dataold);

  displayedColumns = ['invoiceNum', 'customerNum','createDate', 'ociAckSentFlag'];

  obj={
    InvoiceNumber: "",
    CustomerNumber: "",
    FromDate: "",
    ToDate: ""
  };
  setminDate: Date;
  canvas: any;
  ctx: any;
  errorMessage: any;
  countObject: SlayerCountObject;
  showinfo: boolean;

  constructor(private searchser:SearchService,private route: Router,
    private commonser: CommonService) {
    this.commonser.createpreviousUrl('previousPath','/Search');
  }

  ngOnInit() {
    const fromDate = new Date();
    const todate = new Date();
    const finalDate = this.formatFromToDate(fromDate,todate);
    this.showchartspin = true;
    this.retrieveGraphData(finalDate);
  }

  retrieveGraphData(newdata): void{
    let copiedData = [];
    var empty;

    this.searchser.getInvoiceList(newdata).subscribe(
      {
        next: result => {
          empty = result;
          if(empty != null && result.length > 0)
          {
            copiedData = result;
            const countobservable = this.commonser.getCountValues(copiedData);
            countobservable.subscribe((result)=>{
              this.countObject = result,
              this.showchartspin = false;
              this.showinfo = false;
              this.LoadGraphdata(this.countObject);
              this.showrightGraph = (this.countObject.nonAckCount>0 && this.countObject.ackCount>0);
              this.intializePieChartData(this.countObject);
              this.intializeLineChartData(this.countObject)
            });
          }
        },
        error: err => {
          this.errorMessage = err;
          this.showchartspin = false;
          this.showinfo = true;
          console.log(this.errorMessage)
        },
      }
    );
  }

  show(): void{
    this.showlist = false;

    if(this.obj.InvoiceNumber)
    {
      this.finalsearchType = this.obj.InvoiceNumber;
      this.getInvoiceData(this.finalsearchType);
    }
    else if(this.obj.CustomerNumber){
      this.finalsearchType = 'custnum/'+this.obj.CustomerNumber;
      this.getInvoiceData(this.finalsearchType);
    }
    else if(this.obj.FromDate && this.obj.ToDate){
      const encodevalue = btoa(this.formatFromToDate(this.obj.FromDate,this.obj.ToDate));
      this.route.navigate(['DateRangeList',encodevalue]);
    }
    else{
      this.displaymessage = true;
    }
  }

  showformfiv(): void{
    this.showform = true;
  }

  formatFromToDate(from: any,to: any){
    var datePipe = new DatePipe('en-US');
    const fromDate = datePipe.transform(from, 'yyyy-MM-ddT00:00:00Z');
    let toDate = datePipe.transform(to, 'yyyy-MM-ddT23:59:59Z');
    const final = 'daterange/'+fromDate+'/'+toDate;
    return final;
  }

  getInvoiceData(newdata): void{
    const copiedData = [];
    var empty;
    this.showspinner = true;
    this.searchser.getInvoice(newdata).subscribe(
      {
        next: result => {
          empty = result;
          if(empty!=null)
          {
            copiedData.push(empty);
            this.dataSource.data = copiedData;
            this.displaymessage = false;
            this.showlist = true;
            this.showspinner = false;
            // console.log(this.dataSource);
          }
          else
          {
            this.showlist = false;
            this.showspinner = false;
            this.displaymessage = true;
          }
        },
        error: err => {
          this.errorMessage = err;
          this.showspinner = false;
          console.log(this.errorMessage)
        },
      }
    );
  }

  gotoDetails(value): void{
    const encodevalue = btoa(value);
    this.route.navigate(['Details',encodevalue]);
  }

  LoadGraphdata(countobj: SlayerCountObject) {
    this.canvas = document.getElementById('homeChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
          labels: [ "Validation Failed", "Delivered", "Validation Passed"],
          datasets: [{
              // label: 'Services Passed',
              data: [countobj.validationFailedCount,countobj.Deliveredcount,countobj.ValidationCount],
              backgroundColor:['cornflowerblue','lightgreen','lightyellow'],
              borderWidth: 1,
              // borderColor: "#ff0097",
              fill:false
          }
        ],
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.6,
            gridLines: {
              display: false,
              color: "white"
            },
            ticks: {
              fontColor: "white",
              fontSize: 13
            }
          }],
          yAxes: [{
            barPercentage: 0.6,
            angleLines:{
              display: true
            },
            gridLines: {
              display: false,
              color: "white"
            },
            ticks: {
              fontColor: "white",
              fontSize: 14
            }
          }]
        },
        legend: {
          display: false,
        },
        tooltips: {
          callbacks: {
              label: function(tooltipItem) {
                  return "" + Number(tooltipItem.yLabel) + " Invoices";
              }
          }
        },
        responsive: false,
        display:true,
        title:{
          display: true,
          text: 'Invoices Process',
          fontColor: 'white',
          fontSize: 14
        },
      }
    });
  }

  intializePieChartData(valueObj: any): void{
    this.canvas = document.getElementById('pieChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [ "Non Acknowledged", "Acknowledged"],
        datasets: [{
          label: "Population (millions)",
          backgroundColor: ["#f2b55a", "#8e5ea2"],
          data: [valueObj.nonAckCount,valueObj.ackCount]
        }]
      },
      options: {
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        legend:{
          labels: {
            fontColor: 'white'
          },
          generateLabels: {
            strokeStyle: "white",
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'DFS Non-Ack and Ack',
          fontColor: 'white'
        }
      }
    });
  }

  intializeLineChartData(valueObj: any): void{
    this.canvas = document.getElementById('lineChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: [ "Dfs Rejected", "Dfs Accepted"],
        datasets: [{
          backgroundColor: ["#f2b55a", "#8e5ea2"],
          data: [valueObj.dfsRejected,valueObj.dfsAccepted]
        }]
      },
      options: {
        elements: {
          arc: {
            borderWidth: 0
          }
        },
        legend:{
          labels: {
            fontColor: 'white'
          },
          generateLabels: {
            strokeStyle: "white",
          }
        },
        responsive: true,
        title: {
          display: true,
          text: 'DFS Accpet or Reject',
          fontColor: 'white'
        }
      }
    });
  }
}
