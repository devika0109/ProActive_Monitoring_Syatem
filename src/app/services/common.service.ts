import { SlayerCountObject, SlayerState, NonSlayerState, DfSAcceptorReject, SLayerEvent } from './../models/search';
import { Injectable } from '@angular/core';
import { InvoiceEvent } from '../models/search';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import * as Cookies from 'es-cookie';


@Injectable()
export class CommonService {

  countObject : SlayerCountObject;

  constructor(private route:Router) { }

  createpreviousUrl(value: string,url?: string)
  {
    if(url)
    {
      if(Cookies.get(value))
      {
        Cookies.remove(value);
        Cookies.set(value,url);
      }
      else
      {
        Cookies.set(value,this.route.url);
      }
    }
    else
    {
      if(Cookies.get(value))
      {
        Cookies.remove(value);
        Cookies.set(value,this.route.url);
      }
      else
      {
        Cookies.set(value,this.route.url);
      }
    }
  }

  getPreviousUrl(value: string)
  {
    if(Cookies.get(value))
    return Cookies.get(value);
    
    else
    null;
  }

  setPreviousUrl(previousUrl)
  {
    console.log(previousUrl);
    if(previousUrl.includes('DateRangeList/'))
    {
      
      let encodedata = previousUrl.replace('DateRangeList/','');
      let decode = btoa(encodedata);
      this.route.navigate(['/DateRangeList/',decode]);
    }
    else{
      this.route.navigate([previousUrl]);
    }
  }

  getCountValues(object: any[]): any{
    let Newobject: InvoiceEvent[] = object;
    let vpcounter: number = 0, vfcount: number = 0, dcounter: number = 0;
    let ackounter: number = 0, nonackfcounter: number = 0;
    let dfsAcceptcounter: number = 0, dfsRejectcounter: number = 0;
    if(Newobject !=null)
    {
      for(let i=0;i<Newobject.length;i++)
      {
        if(Newobject[i].sLayerEvents != null && Newobject[i].sLayerEvents.length > 0)
        {
          for(let j=0;j<Newobject[i].sLayerEvents.length;j++)
          {
            if(Newobject[i].sLayerEvents[j].state === SlayerState[0].toString())
            {
              vpcounter++;
            }
            else if(Newobject[i].sLayerEvents[j].state === SlayerState[1].toString())
            {
              dcounter++;
            }
            else if(Newobject[i].sLayerEvents[j].state === SlayerState[2].toString())
            {
              vfcount++;
            }
          }
        }

        if(Newobject[i].nonSLayerDFSEvents != null && Newobject[i].nonSLayerDFSEvents.length > 0)
        {
          for(let j=0;j<Newobject[i].nonSLayerDFSEvents.length;j++)
          {
            if(Newobject[i].nonSLayerDFSEvents[j].state === NonSlayerState[0].toString())
            {
              ackounter++;
            }
            else if(Newobject[i].nonSLayerDFSEvents[j].state === NonSlayerState[1].toString())
            {
              nonackfcounter++;
            }
          }
        }

        if(Newobject[i].ociAcks != null && Newobject[i].ociAcks.length > 0)
        {
          for(let j=0;j<Newobject[i].ociAcks.length;j++)
          {
            if(Newobject[i].ociAcks[j].acceptOrReject === DfSAcceptorReject[0].toString())
            {
              dfsRejectcounter++;
            }
            else if(Newobject[i].ociAcks[j].acceptOrReject === DfSAcceptorReject[1].toString())
            {
              dfsAcceptcounter++;
            }
          }
        }
      }
    }

    this.countObject = {
      ValidationCount : vpcounter,
      Deliveredcount : dcounter,
      validationFailedCount : vfcount,
      nonAckCount : nonackfcounter,
      ackCount : ackounter,
      dfsAccepted : dfsAcceptcounter,
      dfsRejected : dfsRejectcounter
    }

    const countObservable = new Observable(observer => {
      setTimeout(() => {
          observer.next(this.countObject);
      }, 1000);
    });
    return countObservable;
  }

  getFilters(value: string,object: any[]): any
  {
    let paramobject: InvoiceEvent[] = object;
    let newObject: InvoiceEvent[] = [];
    let count: number = 0;
    if(paramobject!=null && paramobject.length>0)
    {
      for(let i=0;i<paramobject.length;i++)
      {
        if(paramobject[i].sLayerEvents != null && paramobject[i].sLayerEvents.length > 0)
        {
          for(let j=0;j<paramobject[i].sLayerEvents.length;j++)
          {
            if(paramobject[i].sLayerEvents[j].state.toLowerCase() === value.toLowerCase())
            {
              newObject[count] = paramobject[i];
              count++;
            }
          }
        }
      }
      return newObject;
    }
    else{
      return null;
    }
  }

}