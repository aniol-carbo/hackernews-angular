import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import User from "../models/user.model";



@Injectable()
export class UserService {

  url = ""
  constructor(private http: HttpClient) {
  }

  async getUser(id:number){
    let user;
    let res;
    await this.http.get(`https://asw-hackernwes-g11.herokuapp.com/users/${id}.json`).toPromise().then(data => {
      const values = Object.values(data);
      let map = new Map<string,string>();
      let index = 0;
      for(var value in data) {
          map.set(value,values[index]+"");
          index++;
      }
      user = new User(parseInt(map.get("id")!),map.get("username")!,parseInt(map.get("karma")!),map.get("about")!,map.get("email")!,map.get("created_at")!, map.get("api_key")!);
      user.id = parseInt(map.get("id")!);
      user.username = map.get("username")!;
      user.karma = parseInt(map.get("karma")!);
      if(map.get("about") == "null") user.about = 'Front End Designer';
      else user.about = map.get("about")!
      user.email = map.get("email")!;
      user.created_at = map.get("created_at")!;
      user.api_key = map.get("api_key")!;
    })
    return user;     
  }

  async submitAbout(data: NgForm, user:User){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': user.api_key
    });
    let options = { headers: headers };
    const dataPut = {
      about: data.value.about
    };
    let id = user.id
    return await this.http.put(`https://asw-hackernwes-g11.herokuapp.com/users/${id}`, dataPut, 
    {
      headers: headers,
      responseType: 'text'
    }).toPromise().then( data => {
      
      console.log(data);
    } 
      
    )
  }
}  