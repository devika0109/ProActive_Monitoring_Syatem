import { SearchService } from './../services/searchservice.service';
import { Component, OnInit } from '@angular/core';
import { ProcessRequest } from '../models/processmodel';

const processObject: ProcessRequest= {
  ProcessInvoice : {
    "-releaseID":'0.04.2007.02.01',
    ApplicationArea: {
      Sender:{
        TaskID: 'INVOICE'
      },
      CreationDateTime: '2019-07-13',
      UserArea:{
        SourceID:'MSFTWEB',
        ID: 'MERCHANT',
        Note:{
          "-type": 'SalesChannel',
          "#text": 'US_90'
        }
      }
    },
    DataArea:{
      Invoice: {
        InvoiceHeader:{
          DocumentDateTime:'2019-07-13',
          DocumentReference: [
            {
              "-type":'invoice-number',
              DocumentID:{
                ID: 'Z30TK16M62DO'
              }
            },
            {
              "-type":'Order-number',
              DocumentID:{
                ID: 'Z30TK16M62DO'
              }
            },
            {
              "-type":'DPAAuthID',
              DocumentID:{
                ID: 'Z30TK16M62DO'
              }
            },
            {
              "-type": "original-invoice",
              DocumentID: {
                  ID: ""
              }
            },
            {
                "-type": "account-number",
                DocumentID: {
                    ID: "6879450196075075632"
                }
            },
            {
                "-type": "ParentChannel",
                "Note": "CNS"
            },
            {
                "-type": "SubChannel",
                Note: "CNR"
            },
            {
                "-type": "SalesChannel",
                Note: ""
            },
            {
                "-type": "SourceID",
                Note: "MSFTWEB"
            },
            {
                "-type": "ncl-id",
                DocumentID: {
                    ID: ""
                }
            }
          ],
          UserArea: {
            PaymentTerm: {
              Term: {
                  Description: "DFS DPA",
                  Amount: {
                      "-currencyID": "USD",
                      "#text": "108.61"
                  }
              }
            },
            DFS_Section: {
                Paycode: "R",
                CompanyNumber: "90",
                TransactionReferenceID: "248540"
            }
          }
        }
      }
    }
  }
}

@Component({
  selector: 'app-processinvoice',
  templateUrl: './processinvoice.component.html',
  styleUrls: ['./processinvoice.component.css']
})

export class ProcessinvoiceComponent implements OnInit {
 
  constructor(private searchser: SearchService) {
  }

  ngOnInit() {
    this.searchser.getProcessInvoice(processObject).subscribe({
      next : result =>{
        console.log(result);
      },
      error: err =>{
        console.log(err);
      }
    });
  }
}
