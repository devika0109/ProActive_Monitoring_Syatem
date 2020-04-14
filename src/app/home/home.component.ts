import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'InvoiceEvent Search';
  display: string;
   badgeCount: number=4;

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  checklogin(): string{
    if(this.auth.isLoggednIn()){
      return this.display = ""
    }
    else{
      return this.display = 'Login'
    }
  }

  logout(){
    this.auth.logout();
  }

}
