import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { tap } from 'rxjs/operators/tap';
import { of } from 'rxjs/observable/of';
import { InvoiceEvent } from '../models/search';
import { ProcessRequest, ProcessResponse } from '../models/processmodel';


@Injectable()
export class SearchService {

  private baseUrl: string = 'https://oci-invoice-notifier-prod.dfs.pcf.dell.com/';
  private InvoiceSuffix: string = 'api/v1/Invoice/';

  constructor(private http : HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  log(msg: any) { 
    console.log(msg); 
  }

  getInvoice (Invoicenumber : string):Observable<InvoiceEvent> {
   let url = this.baseUrl + this.InvoiceSuffix + Invoicenumber;
   const starttime = new Date().getTime();
    return this.http.get<InvoiceEvent>(url)
      .pipe(
        tap(data =>{
          // JSON.stringify(data)
          const endtime: number = new Date().getTime();
          console.log("response time : "+ (endtime - starttime));
        }),
        // catchError(this.handleError('getInvoice', null))
        // catchError(this.handleError(error.prototype,'getLoggingDetails', []))
      );
  }

  getInvoiceList (Invoicenumber : string):Observable<InvoiceEvent[]> {
    let url = this.baseUrl + this.InvoiceSuffix + Invoicenumber;

    const starttime = new Date().getTime();
     return this.http.get<InvoiceEvent[]>(url)
       .pipe(  
         tap(data =>{
            // JSON.stringify(data)
            const endtime: number = new Date().getTime();
            console.log("response time : "+ (endtime - starttime));
          }),
         // catchError(this.handleError('getInvoicelist', []))
         // catchError(this.handleError(error.prototype,'getLoggingDetails', []))
        );
   }

  getProcessInvoice (obj : ProcessRequest):Observable<ProcessResponse> {
    let url = 'https://processinvoice-ge1.ausvdc02.pcf.dell.com/invoice';

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic bXNmdDpyZWNoYXJnZQ==");
    headers = headers.append("Content-Type", "application/json");

    const httpOptions = {
      headers: headers
    };
    return this.http.post<ProcessResponse>(url,obj, httpOptions)
      .pipe(  
        catchError(this.handleError('getProcessInvoice',null))
        // catchError(this.handleError(error.prototype,'getLoggingDetails', []))
      );
  }
  
  // Handle Error using observable 
  // If Required err: HttpErrorResponse
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error ); // log to console instead
      // console.error(error +" "+err.error.message); 
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
