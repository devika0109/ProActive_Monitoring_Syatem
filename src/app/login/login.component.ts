import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  username: string;
  password: string;
  error: string;

  constructor(private route:Router, private auth:AuthService) { }

  ngOnInit() {
  }

  login(){
    (this.username && this.password && this.auth.verifyLogin(this.username,this.password))
    ? this.route.navigate(["Search"]):  this.error = "Please Enter Correct Credentials";
  }
}
