import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Tweet from '../shared/models/tweet.model'
import { TweetService } from '../shared/services/tweet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tweets:Tweet[] = [];
  votedTweets:Tweet[] = [];
  votedMap:Map<string,boolean> = new Map();
  tweetService:TweetService;
  result: any;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute) { 
    this.tweetService = new TweetService(http);
  }

  async ngOnInit(){

   
    
  //  this.getTweets();

  //  this.http.get("https://asw-hackernwes-g11.herokuapp.com/tweets.json").toPromise().then(data => {
  //    console.log(data);
  //  })

   this.activatedroute.params.subscribe(async data => {
    let order = data['order'];
    let user = data['userId'];
    let info = data['info'];
    if (order) {
      if (order === "new"){
        await this.tweetService.getNewTweets().then(data => {
          this.tweets = data;
          for (let d in data){
            this.tweets.push(data[d]);
          }
        });
      } else if (order === "past") {
        await this.tweetService.getPastTweets().then(data => {
          this.tweets = data;
          for (let d in data){
            this.tweets.push(data[d]);
          }
        });
      } else if (order === "ask") {
        await this.tweetService.getAskTweets().then(data => {
          this.tweets = data;
          for (let d in data){
            this.tweets.push(data[d]);
          }
        });
      } else if (order === "show") {
        await this.tweetService.getShowTweets().then(data => {
          this.tweets = data;
          for (let d in data){
            this.tweets.push(data[d]);
          }
        });
      }
    } else if (info) {
      if(info ==="voted"){
        await this.tweetService.getVotedTweets(user).then(data => {
          this.tweets = data;
            for (let d in data){
              this.tweets.push(data[d]);
            }
        });
      }
      else if(info === "submissions"){
        await this.tweetService.getTweetsSubmited(user).then(data => {
          this.tweets = data;            
        });
      }
    }
    else {
      await this.tweetService.getTweets().then(data => {
        this.tweets = data;
        for (let d in data){
          this.tweets.push(data[d]);
        }
      });
    }

    await this.tweetService.getVotedTweets(localStorage.getItem("user_id")!).then(data => {
      for (let tweet of this.tweets) {
        this.votedMap.set(tweet.id, false);
      }
      this.votedTweets = data;

      for (let d in data) {
       
        this.votedTweets.push(data[d]);
        this.votedMap.set(data[d].id,true);
      }
    
    })
    
  })

  }

  isVoted (tweet:Tweet): boolean {
    if (!this.votedMap.has(tweet.id)) return false;
    else {
      return this.votedMap.get(tweet.id)!;
    }
  }

  async vote (id:string, vote:string) {
    await this.tweetService.voteTweet(id,vote);
    for (let i of this.tweets) {
      if (i.id == id) {
        if (vote == "true")i.points +=1;
        else i.points-=1;
      }
    }
    this.detachVoted();
  }

  async detachVoted() {
    await this.tweetService.getVotedTweets(localStorage.getItem("user_id")!).then(data => {
      for (let tweet of this.tweets) {
        this.votedMap.set(tweet.id, false);
      }
      this.votedTweets = data;
      for (let d in data) {
        this.votedTweets.push(data[d]);
        this.votedMap.set(data[d].id,true);
      }
     
    })
  }

  myTweet(user_id:string): boolean {
    if (user_id == localStorage.getItem("user_id")) return true;
    else return false;
  }

  async deleteTweet(tweet_id:string) {
    await this.tweetService.deleteTweet(tweet_id).then(data => {
      this.ngOnInit();
    });
  }
}
