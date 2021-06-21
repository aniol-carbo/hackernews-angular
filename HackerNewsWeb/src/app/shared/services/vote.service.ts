import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Tweet from "../models/tweet.model";
import Vote from "../models/vote.model";



@Injectable()
export class VoteService {

    url = ""
    constructor(private http: HttpClient) {
    }

    async getVotes(){
        let votes:Vote[] = [];
        let res;
        this.http.get("https://asw-hackernwes-g11.herokuapp.com/votes").toPromise().then(data => {

            const values = Object.values(data);
            for (let value of values){
                let vt = new Vote(value.type,value.author,value.id);

                votes.push(vt);
            }
          })
        return votes;  
    }  
}