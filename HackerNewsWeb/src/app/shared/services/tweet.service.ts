import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";



@Injectable()
export class TweetService {

    url = "";
    userService:UserService;
    constructor(private http: HttpClient) {
        this.userService = new UserService(http);
    }

    async getTweets(){
        let tweets:Tweet[] = [];
        let res;
        this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json").toPromise().then(data => {

            const values = Object.values(data);
            for (let value of values){
                let tw = new Tweet(value.id,value.title,value.url,value.content,value.author,value.created_at);

                tw.user_id = value.user_id;
                tw.points = Number(value.points);
                tweets.push(tw);
            }

          })
        return tweets;  
    }  

    async getNewTweets(){
        let tweets:Tweet[] = [];
        let res;
        this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json", {
            params: {
                orderby: "newest"
            }
        }).toPromise().then(data => {
            const values = Object.values(data);
            for (let value of values){
                let tw = new Tweet(value.id,value.title,value.url,value.content,value.author,value.created_at);
                tw.user_id = value.user_id;
                tw.points = Number(value.points);
                tweets.push(tw);
            }

          })
        return tweets;  
    }  

    async getPastTweets(){
        let tweets:Tweet[] = [];
        let res;
        this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json", {
            params: {
                orderby: "past"
            }
        }).toPromise().then(data => {
            const values = Object.values(data);
            for (let value of values){
                let tw = new Tweet(value.id,value.title,value.url,value.content,value.author,value.created_at);
                tw.user_id = value.user_id;
                tw.points = Number(value.points);
                tweets.push(tw);
            }
    
          })
        return tweets;  
    }  

    async getShowTweets(){
        let tweets:Tweet[] = [];
        let res;
        this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json", {
            params: {
                orderby: "url"
            }
        }).toPromise().then(data => {
            const values = Object.values(data);
            for (let value of values){
                let tw = new Tweet(value.id,value.title,value.url,value.content,value.author,value.created_at);
                tw.user_id = value.user_id;
                tw.points = Number(value.points);
                tweets.push(tw);
            }
          
          })
        return tweets;  
    }  

    async getAskTweets(){
        let tweets:Tweet[] = [];
        let res;
        this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json", {
            params: {
                orderby: "ask"
            }
        }).toPromise().then(data => {
            const values = Object.values(data);
            for (let value of values){
                let tw = new Tweet(value.id,value.title,value.url,value.content,value.author,value.created_at);
                tw.user_id = value.user_id;
                tw.points = Number(value.points);
                tweets.push(tw);
            }
          })
        return tweets;  
    } 

    async getTweetInfo(id: string){
        let tw;
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets/"+id).toPromise().then(data => {
            const values = Object.values(data);
            let map = new Map<string,string>();
            let index = 0;
            for(var value in data) {
                map.set(value,values[index]+"");
                index++;
            }
            
             tw = new Tweet(map.get("id")!,map.get("title")!,map.get("url")!,map.get("content")!,map.get("author")!,map.get("created_at")!);
             tw.points = parseInt(map.get("points")!);
             tw.user_id = map.get("user_id")!;
             tw.ask = map.get("ask")!;
          })
          return tw;
         
    }

    async getTweetsSubmited(user_id: string){
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        let tweets:Tweet[] = [];
        let res;
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json", {
            params: {
                user_id: user_id,
                voted: "false"
            },
            headers: headers
        }).toPromise().then(async data => {
            const values = Object.values(data);
            let i = 0;
            for (let value of values){
                let u: User;
                let tw = new Tweet(value.id,value.title,value.url,value.content,value.author,value.created_at);
                await this.userService.getUser(Number(user_id)).then (data => {
                    u = data!;
                    tw.author = u.username;
                    tw.user_id = user_id;
                    tweets.push(tw);
                })
            }
        })
        return tweets;


    }

    async getVotedTweets(user_id: string){
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        let tweets:Tweet[] = [];
        let res;
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json", {
            params: {
                user_id: user_id,
                voted: "true"
            },
            headers: headers
        }).toPromise().then(async data => {
            const values = Object.values(data);
            let u: User;
            for (let value of values){
                if (value.length != 0) {
                    let id = value[0].id;
                    if (id != undefined) {
                        let tw = new Tweet(value[0].id,value[0].title,value[0].url,value[0].content,value[0].author,value[0].created_at);
                        await this.userService.getUser(Number(user_id)).then (data => {
                            u = data!;
                            tw.user_id = value[0].user_id;
                            tweets.push(tw);
                        })
                    }
                }   
            }
          })
        return tweets;
    }


    async submitTweets(newTweet: Tweet){
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        let options = { headers: headers };
        const data = {
            title: newTweet.title,
            url: newTweet.url,
            content: newTweet.content,
        };
        return this.http.post('https://asw-hackernwes-g11.herokuapp.com/tweets', data, 
        {
            headers: headers,
            responseType: 'text'
        }).subscribe( 
            res =>{
                console.log(res);
                // window.location.href = 'http://localhost:4200/home';
            },
            err => {
                console.log(err.message);
            }
        )
    }
    
    async voteTweet(tweet_id:string, vote:string) {
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets/"+tweet_id, {
            params: {
                vote: vote
            },
            headers: headers
        }).toPromise().then(data => {
            
            console.log(data);
          })
    }

    async deleteTweet(tweet_id: string) {
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        await this.http.delete("https://asw-hackernwes-g11.herokuapp.com/tweets/"+tweet_id, {
            headers: headers
        }).toPromise().then(data => {
            
            console.log(data);
          })
    }
}