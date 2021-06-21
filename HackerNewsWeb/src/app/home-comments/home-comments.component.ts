import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Comment from '../shared/models/comment.model'
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'app-home-comments',
  templateUrl: './home-comments.component.html',
  styleUrls: ['./home-comments.component.css']
})
export class HomeCommentsComponent implements OnInit {
  comments:Comment[] = [];
  commentService:CommentService;
  votedComments:Comment[] = [];
  votedMap:Map<string,boolean> = new Map();
  loading:boolean = false;
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute) { 
    this.commentService = new CommentService(http);
  }

  ngOnInit(): void {
    this.activatedroute.params.subscribe(async data => {
      let user = data['userId'];
      let info = data['info'];
      this.loading =true;
      if (info == 'written') {
        await this.commentService.getCommentsSubmitted(user).then(data => {
          this.comments = data;
            // for (let d in data){
            //   this.comments.push(data[d]);
            // }
        });
      } else if (info == 'voted') {
        await this.commentService.getVotedComments(user).then(data => {
          this.comments = data;
        
            // for (let d in data){
            //   this.comments.push(data[d]);
            // }
        });
      }
      else {
        await this.commentService.getAllComments().then(data => {
          this.comments = data;
          // for (let d in data){
          //   this.comments.push(data[d]);
          // }
          
        });
      }
      await this.commentService.getVotedComments(localStorage.getItem('user_id')!).then(data => {
        for (let comment of this.comments) {
          this.votedMap.set(comment.id, false);
        }
        this.votedComments = data;
        for (let d in data) {
          this.votedComments.push(data[d]);
          this.votedMap.set(data[d].id,true);
        }
      })
      this.loading = false;
    });
  }

  isVoted (comment:Comment): boolean {
    if (!this.votedMap.has(comment.id)) return false;
    else {
      return this.votedMap.get(comment.id)!;
    }
  }

  async vote (id:string, vote:string) {
    await this.commentService.voteComment(id,vote);
    for (let i of this.comments) {
      if (i.id == id) {
        if (vote == "true")i.points+=1;
        else i.points-=1;
      }
    }
    this.detachVoted();
  }

  async detachVoted() {
    await this.commentService.getVotedComments(localStorage.getItem('user_id')!).then(data => {
      for (let comment of this.comments) {
        this.votedMap.set(comment.id, false);
      }
      this.votedComments = data;
      for (let d in data) {
        this.votedComments.push(data[d]);
        this.votedMap.set(data[d].id,true);
      }
    })
  }

  myComment(c:Comment):boolean {
    if (c.user == localStorage.getItem('user_id')) return true;
    else return false;
  }

}
