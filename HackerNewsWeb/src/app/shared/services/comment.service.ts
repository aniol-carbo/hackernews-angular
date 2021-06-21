import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import Tweet from "../models/tweet.model";
import Vote from "../models/vote.model";
import Comment from "../models/comment.model";
import { UserService } from "./user.service";
import User from "../models/user.model";



@Injectable()
export class CommentService {

    url = ""
    userService:UserService;
    constructor(private http: HttpClient) {
        this.userService = new UserService(http);
    }

    async getComments(){
        let comments:Comment[] = [];
        let resC:Comment[] = [];
        let res;
        let authorMap:Map<string,string> = new Map();
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/comments.json").toPromise().then(async data => {
            
            const values = Object.values(data);
            for (let value of values){
                    let vt = new Comment();
                    let u:User;
                    vt.id = value.id;
                    vt.text = value.text;
                    vt.escomment = value.escomment;
                    vt.points = Number(value.points);
                    vt.user = value.user;
                    vt.contribution = value.contribution;
                    vt.comment_id = value.comment_id;
                    vt.created_at = value.created_at;
                    if (authorMap.has(vt.user) == false) {
                        await this.userService.getUser(Number(vt.user)).then (data => {
                            u = data!;
                            vt.author = u.username;
                            comments.push(vt);
                            authorMap.set(vt.user,u.username);
                
                        })
                    } else {
                        vt.author = authorMap.get(vt.user)!;
                        comments.push(vt);
                    }
                    
                  
            }

           

            for (let value of comments){
                    let vt = new Comment();
                    vt.id = value.id;
                    vt.text = value.text;
                    vt.escomment = value.escomment;
                    vt.points = value.points;
                    vt.user = value.user;
                    vt.contribution = value.contribution;
                    vt.comment_id = value.comment_id;
                    vt.created_at = value.created_at;
                    vt.author = value.author;
                if (vt.comment_id === null) {
                    for (var i = 0; i < comments.length; i++) {
                        if (comments[i].id == vt.comment_id) comments.splice(i,1);
                    }
                    vt.sonComments = this.getTreeArray(comments,vt.id)
                    resC.push(vt);
                }
            }
          })
  
        return resC;  
    }  

    async submitComment(c:Comment) {
        let api_key = localStorage.getItem("user_apikey");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        let options = { headers: headers };
        const data = {
            text: c.text,
            contribution: c.contribution,
            escomment: c.escomment,
            comment_id: c.comment_id
        };
       
        return await this.http.post('https://asw-hackernwes-g11.herokuapp.com/comments', data, 
        {
            headers: headers,
            responseType: 'text'
        }).subscribe( 
            res =>{
                console.log(res);
                // window.location.href = 'http://localhost:4200/tweet/'+c.contribution;
            },
            err => {
                console.log(err.message);
            }
        )
    }

    getTreeArray(comments:Comment[], id_parent:string):Comment[] {
        let cr:Comment[] = [];
        for (let i of comments) {
            if (i.comment_id == id_parent) {
                let caux = comments;
                for (var j = 0; j < caux.length; j++) {
                    if (caux[j].id == i.id) caux.splice(j,1);
                }
                i.sonComments = this.getTreeArray(caux,i.id);
                cr.push(i);
            }
        }
        return cr;
    }

    async getVotedComments(user_id: string){
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        let comments:Comment[] = [];
        let res;
        let authorMap:Map<string,string> = new Map();
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/comments.json", {
            params: {
                user_id: user_id,
                voted: "true"
            },
            headers: headers
        }).toPromise().then(async data => {
            const values = Object.values(data);
        
            for (let value of values){
                if (value.length != 0) {
                    let cm = new Comment();
                    let u:User;
                  
                    cm.id = value[0].id;
                    cm.text = value[0].text;
                    cm.escomment = value[0].escomment;
                    cm.points = value[0].points;
                    cm.user = value[0].user;
                    cm.contribution = value[0].contribution;
                    cm.comment_id = value[0].comment_id;
                    cm.created_at = value[0].created_at;
                    if (authorMap.has(cm.user) == false) {
                        await this.userService.getUser(Number(cm.user)).then (data => {
                            u = data!;
                            cm.author = u.username;
                            cm.sonComments = value[0].sonComments;
                            comments.push(cm);
                            authorMap.set(cm.user,u.username);
                        })
                    } else {
                        cm.author = authorMap.get(cm.user)!;
                        cm.sonComments = value[0].sonComments;
                        comments.push(cm);
                    }
                }
            }
          })
        return comments;
    }

    async voteComment(comment_id:string, vote:string) {
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/comments/"+comment_id, {
            params: {
                vote: vote
            },
            headers: headers
        }).toPromise().then(data => {
            console.log(data);
          })
    }

    async getAllComments(){
        let comments:Comment[] = [];
        let resC:Comment[] = [];
        let res;
        let authorMap:Map<string,string> = new Map();
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/comments.json").toPromise().then(async data => {
            const values = Object.values(data);
            for (let value of values){
                let vt = new Comment();
                let u:User;
                vt.id = value.id;
                vt.text = value.text;
                vt.escomment = value.escomment;
                vt.points = Number(value.points);
                vt.user = value.user;
                vt.contribution = value.contribution;
                vt.comment_id = value.comment_id;
                vt.created_at = value.created_at;
                if (authorMap.has(vt.user) == false) {
                    await this.userService.getUser(Number(vt.user)).then (data => {
                        u = data!;
                        vt.author = u.username;
                        comments.push(vt);
                        authorMap.set(vt.user,u.username);
                    })
                } else {
                    vt.author = authorMap.get(vt.user)!;
                    comments.push(vt);
                }
                
            }
        });
        return comments;
    }

    async getCommentsSubmitted(user_id: string){
        let api_key = localStorage.getItem("user_apikey");
        let user_id_ls = localStorage.getItem("user_id");
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': api_key!
        });
        let comments:Comment[] = [];
        let res;
        let authorMap:Map<string,string> = new Map();
        await this.http.get("https://asw-hackernwes-g11.herokuapp.com/comments.json", {
            params: {
                user_id: user_id,
                voted: "false"
            },
            headers: headers
        }).toPromise().then(async data => {
            const values = Object.values(data);
            for (let value of values){
                let vt = new Comment();
                let u:User;
                vt.id = value.id;
                vt.text = value.text;
                vt.escomment = value.escomment;
                vt.points = Number(value.points);
                vt.user = value.user;
                vt.contribution = value.contribution;
                vt.comment_id = value.comment_id;
                vt.created_at = value.created_at;
                if (authorMap.has(vt.user) == false) {
                    await this.userService.getUser(Number(vt.user)).then (data => {
                        u = data!;
                        vt.author = u.username;
                        comments.push(vt);
                        authorMap.set(vt.user,u.username);
                    })
                } else {
                    vt.author = authorMap.get(vt.user)!;
                    comments.push(vt);
                }
            }
           
          })
        return comments;
    }
}