import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import "rxjs/Rx";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import {InvoiceDetails} from '../models/invoicedetails';

@Injectable()
export class ReportService { 
  //httpOptions :  HttpHeaders;
  constructor(private http : HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    httpOptions.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
   }
  log(msg: any) { console.log(msg); }
   
  private getInvoices ='https://invoice-processing-api-reduced-excellent-gnu-of.ausvdc02.pcf.dell.com/api/v1/invoice/check/all';
  
  getInvoiceDetails ():Observable<InvoiceDetails[]> {
    return this.http.get<InvoiceDetails[]>(this.getInvoices)
      .pipe(  
        tap(data =>{
          console.log(JSON.stringify(data));
        }),
        catchError(this.handleError('getInvoiceDetails', []))
      );
  }
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}