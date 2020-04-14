import { Injectable } from '@angular/core';
import * as Cookies from 'es-cookie';


@Injectable()
export class CreateCookieService {

  constructor() { }

  // Create Cookie
  createCookie(type: string,value: any){
    if(value)
    {
      Cookies.set(type, value)
    }
  }

}
