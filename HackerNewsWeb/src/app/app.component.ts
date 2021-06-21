import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HackerNewsWeb';
  routerR:any;

  constructor(private http: HttpClient, private router: Router) {
    this.routerR = router;
   }

  ngOnInit () {
    localStorage.setItem("username","danielvequi");
    localStorage.setItem("user_id","8");
    localStorage.setItem("user_apikey","653a378c51cfdfaa231b9893d3db1eb4");
  }
}
