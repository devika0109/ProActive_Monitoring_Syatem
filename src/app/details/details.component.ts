import { InvoiceEvent, ColumnNames } from './../models/search';
import { SearchService } from './../services/searchservice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  sLayerEventcolumns : ColumnNames[] = [
    {
      name:'system',
      display: 'Originating System'
    },
    {
      display : 'Event State',
      name : 'state'
    },
    {
      display : 'Invoice Creation TimeStamp',
      name : 'invoiceCreationTimeStamp'
    },
    {
      display : 'Notifier Processing TimeStamp',
      name : 'stateChangeTimeStamp'
    },
    {
      display : 'Description',
      name : 'description'
    }
  ];

  nonsLayercolumns : ColumnNames[] = [
    {
      name: 'system',
      display: 'Originating System'
    },
    {
      name: 'state',
      display: 'Event State'
    },
    {
      name: 'stateChangeTimeStamp',
      display: 'Event TimeStamp'
    },
    {
      name: 'description',
      display: 'Description'
    }
  ]

  ociAckscolumns : ColumnNames[] = [
    {
      name:'messageId',
      display:'GUID'
    },
    {
      name:'acceptOrReject',
      display:'AcceptOrReject'
    },
    {
      name:'eventType',
      display:'Event Type'
    },
    {
      name:'ociAckTimeStamp',
      display:'TimeStamp'
    },
    {
      name:'notes',
      display:'Notes'
    }
  ]

  InorCustNum : string = '';
  title: string = 'Invoice Event Deatils';
  detailsObj: InvoiceEvent;
  errormessage: any;
  previousUrl: string;

  constructor(private serachser:SearchService,private _activatedroute:ActivatedRoute,
    private router:Router,private commonser:CommonService) {
      this.previousUrl = commonser.getPreviousUrl('previousPath');
      console.log(this.previousUrl);
  }

  ngOnInit() {
    this._activatedroute.paramMap.subscribe(params => { 
      this.InorCustNum = params.get('id'); 
    });
    this.InorCustNum = atob(this.InorCustNum);
    this.getDetails();
    console.log(this.previousUrl);
  }

  back()
  {
    this.commonser.setPreviousUrl(this.previousUrl);
  }

  getDetails(): void{
    this.serachser.getInvoice(this.InorCustNum).subscribe(
      {
        next: result =>{
          this.detailsObj = result;
          // console.log(this.detailsObj);
        },
        error: err => {
          this.errormessage = err;
        }
    });
  }
}
