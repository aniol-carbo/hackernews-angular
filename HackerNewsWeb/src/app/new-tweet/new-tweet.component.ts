import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import Tweet from '../shared/models/tweet.model';
import { TweetService } from '../shared/services/tweet.service';

@Component({
  selector: 'app-new-tweet',
  templateUrl: './new-tweet.component.html',
  styleUrls: ['./new-tweet.component.css']
})
export class NewTweetComponent implements OnInit {
  //form: FormGroup;
  //tweet: Tweet;
  tweetService:TweetService;
  result: any;
  routerR:any;
  failed:boolean = false;
  tweets:Tweet[] = [];
  
  
  constructor(private http: HttpClient,private router: Router) {
    this.tweetService = new TweetService(http);
    this.routerR = router;
  }

  async ngOnInit() {
    await this.tweetService.getTweets().then(data => {
      this.tweets = data;
      for (let d in data){
        this.tweets.push(data[d]);
      }
    });
  }

  autogrow(){
    let textArea = document.getElementById("contentText")!;    
    textArea.style.height = '0 px';
    textArea.style.height = (textArea.scrollHeight)+"px";
  }

  async submitTweet (data: NgForm) {
    if ((data.value.url == "" && data.value.contentText == "") || (data.value.title == "")) {
      this.failed = true;
    } else {
      let newTweetUrl = data.value.url.split("www.")[1];
      let exists = false;
      let idRepeted = "";
      if (newTweetUrl != "") {
        for (let tw of this.tweets){
          if (tw.url == newTweetUrl && tw.url != null && tw.url != "") {
            exists = true;
            idRepeted = tw.id;
          }
        }
      }
      if (exists) {
        this.routerR.navigate(['/tweet/'+idRepeted]);
      }
      else {
        let tweet = new Tweet('40', data.value.title, data.value.url, data.value.contentText, "daniel.vega.quilcat","2021-04-03T10:41:1234Z");
          const result:any = await this.tweetService.submitTweets(tweet).then(data => {
          this.routerR.navigate(['/home/new']);
        });
      }
      
    
    // // this.result = result;
    }
  }
}


