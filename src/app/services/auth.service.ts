import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import * as Cookies from 'es-cookie';

@Injectable()
export class AuthService {

  constructor(private router:Router) { }

  verifyLogin(username: string , password: string){
    return (environment.mainUser === username && environment.passowrd === password)? (this.sendToken(username),
    true) : false;
  }

  sendToken(token: string) {
    // localStorage.setItem("LogUser", token)
    Cookies.set( "Loguser", token)
  }
  
  getToken() {
   return (environment.mainUser === Cookies.get("Loguser"))
    ? Cookies.get("Loguser"): null
  }

  isLoggednIn() {
    return this.getToken() !== null;
  }

  logout() {
    // localStorage.removeItem("LogUser");
    Cookies.remove("Loguser");
    this.router.navigate(["login"]);
  }

}
