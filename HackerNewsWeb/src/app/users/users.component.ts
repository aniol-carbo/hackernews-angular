import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import User from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userService:UserService;
  user:User
  user_id_ls:number;

  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute) {
    this.userService = new UserService(http);
    this.user = new User(0,"",0,"","","","");
  }
  
  async ngOnInit(){
    let order = 0;
    this.activatedroute.params.subscribe(async data => {
      order = parseInt(data['id']);
    })
    await this.userService.getUser(order).then(data => {
      this.user = data!;
      console.log(this.user);
    })
    this.user_id_ls = Number(localStorage.getItem("user_id"));
  }

  async submitAbout (data: NgForm) {
    const result = await this.userService.submitAbout(data, this.user);
    this.ngOnInit();
    this.router.navigate([this.router.url])
  }

  canModify(): boolean {
    return this.user.id == this.user_id_ls;
  }
}
