import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  username:string;
  user_id:string;
  api_key:string;
  constructor() { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username")!;
    this.user_id = localStorage.getItem("user_id")!;
    this.api_key = localStorage.getItem("user_apikey")!;
  }

  changeToDV() {
    localStorage.setItem("username","danielvequi");
    localStorage.setItem("user_id","8");
    localStorage.setItem("user_apikey","653a378c51cfdfaa231b9893d3db1eb4");
    this.ngOnInit();
  }

  changeToAC() {
    localStorage.setItem("username","aniolcarbo");
    localStorage.setItem("user_id","7");
    localStorage.setItem("user_apikey","8b1053cb34e6bf0937637c35f356e248");
    this.ngOnInit();
  }

}
