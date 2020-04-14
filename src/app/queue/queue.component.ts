import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatSort} from '@angular/material';
import { DataSource } from '@angular/cdk/table';


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent  {

  name:string='Queue Status';
  brams(): void{
    this.name='BRAMS MQueue';

  }
  dbc(): void{
    this.name='DBC MQueue';

  }
  dpam(): void{
    this.name='DPAM MQueue';
  }
  fms(): void{
    this.name='FMS MQueue';
  }
  lease(): void{
    this.name='LEASE MQueue';
  }
  loan(): void{
    this.name='LOAN MQueue';
  }
  rams(): void{
    this.name='RAMS MQueue';
  }

  smbfraud(): void{
    this.name='SMB Fraud Case MQueue';
  }
  rtpacase(): void{
    this.name='RTPA Case MQueue';
  }
  rtpasubmitservice(): void{
    this.name='RTPA Submit Service MQueue';
  }
  dfsresponse(): void{
    this.name='DFS Response MQueue';
  }
   cancelorder(): void{
    this.name='CANCEL ORDER MQueue';
  }
   dfsrequest(): void{
    this.name='DFS Request MQueue';
  }


}


