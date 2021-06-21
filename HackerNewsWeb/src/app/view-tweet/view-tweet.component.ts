import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Tweet from '../shared/models/tweet.model';
import { CommentService } from '../shared/services/comment.service';
import { TweetService } from '../shared/services/tweet.service';
import Comment from '../shared/models/comment.model';
import { NgForm } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'converter' })
export class ConverterPipe implements PipeTransform {
    transform(array: any[], id: string = "id", parentId: string = "parent", rootValue: any = "0"): any[] {
        return this.filterNodes(array, id, parentId, rootValue);
    }
    filterNodes(array: any[], id: string, parentId: string, parentValue: any): any[] {
        return array.filter((node) => {
            return node[parentId] === parentValue;
        }).map((node) => {
            node["items"] = this.filterNodes(array, id, parentId, node[id]);
            return node;
        });
    }
}

@Component({
  selector: 'app-view-tweet',
  templateUrl: './view-tweet.component.html',
  styleUrls: ['./view-tweet.component.css']
})
export class ViewTweetComponent implements OnInit {
  tweet: Tweet;
  tweetService:TweetService;
  commentService:CommentService;
  comments:Comment[] = [];
  votedTweets:Tweet[] = [];
  votedMap:Map<string,boolean> = new Map();
  loading:boolean = false;

  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute) { 
    this.tweetService = new TweetService(http);
    this.commentService = new CommentService(http);
    this.tweet = new Tweet("","","","","","");
  }

  async ngOnInit() {
  this.comments = [];
  this.activatedroute.params.subscribe(async data => {
    let order = data['id'];
    
    await this.tweetService.getTweetInfo(order).then( data => {
      this.tweet = data!;
    });
    this.loading =true;
    await this.commentService.getComments().then (data => {
      for (let d in data){
        if (data[d].contribution == this.tweet.id){
          this.comments.push(data[d]);
        }
      }
    });
    await this.tweetService.getVotedTweets(localStorage.getItem("user_id")!).then(data => {
      
      this.votedMap.set(this.tweet.id, false);
      
      this.votedTweets = data;
      for (let d in data) {
        this.votedTweets.push(data[d]);
        this.votedMap.set(data[d].id+"",true);
      }
      console.log(this.votedMap);
      this.loading =false;
    })
    console.log(this.loading);
    this.loading =false;
  })
  

  }

 async onSubmit(data: NgForm) {
    console.log(data.value.text);
    if (data.value.text != "") {
      let c:Comment = new Comment();
      c.text = data.value.text;
      c.escomment = "true";
      c.contribution = this.tweet.id;
      const result = await this.commentService.submitComment(c);
      this.ngOnInit();
    }
  }

  isVoted (): boolean {
    if (!this.votedMap.has(this.tweet.id)) return false;
    else {
      return this.votedMap.get(this.tweet.id)!;
    }
  }

  async vote (id:string, vote:string) {
    await this.tweetService.voteTweet(id,vote);
    if (vote == "true")this.tweet.points +=1;
    else this.tweet.points-=1;
    this.detachVoted();
  }

  async detachVoted() {
    await this.tweetService.getVotedTweets(localStorage.getItem("user_id")!).then(data => {
     this.votedMap.set(this.tweet.id, false);
      this.votedTweets = data;
      for (let d in data) {
        this.votedTweets.push(data[d]);
        this.votedMap.set(data[d].id+"",true);
      }
      console.log(this.votedMap);
    })
  }

}


