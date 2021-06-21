import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routerR:any;
  logged_user: string;

  constructor(private http: HttpClient, private router: Router) {
    this.routerR = router;
   }

  ngOnInit(): void {
  this.logged_user = localStorage.getItem("username")!;
  }

  navigateTweet(): void{
    this.routerR.navigate(['tweet']);
  }

}
