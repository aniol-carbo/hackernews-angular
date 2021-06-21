import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import Comment from '../shared/models/comment.model';
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  sonComments: Comment[];
  activatedReply: boolean = false;
  commentService: CommentService;
  votedComments:Comment[] = [];
  

  votedMap:Map<string,boolean> = new Map();
  constructor(private http: HttpClient, private router: Router, private activatedroute: ActivatedRoute) { 
    this.commentService = new CommentService(http);
  }

  async ngOnInit() {
    this.sonComments = this.comment.sonComments;
    this.comment.points -=1;
    

    await this.commentService.getVotedComments(localStorage.getItem('user_id')!).then(data => {
      this.votedMap.set(this.comment.id, false);
      
      this.votedComments = data;
      for (let d in data) {
        this.votedComments.push(data[d]);
        this.votedMap.set(data[d].id,true);
      }
    })
}


  

  activateReply(): boolean{
    this.activatedReply = true;
    return this.activatedReply;
  }

  async onSubmit(data: NgForm) {
    if (data.value.text != "") {
      let c:Comment = new Comment();
      c.text = data.value.text;
      c.escomment = "true";
      c.contribution = this.comment.contribution;
      c.comment_id = this.comment.id;
      const result = await this.commentService.submitComment(c);
      this.router.navigate(['/tweet/'+this.comment.contribution]);
      delay(0.5);
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/tweet/'+this.comment.contribution]));
    }
  }

  isVoted (comment:Comment): boolean {
    if (!this.votedMap.has(comment.id)) return false;
    else {
      return this.votedMap.get(comment.id)!;
    }
  }

  myComment(comment: Comment): boolean {
    let id = localStorage.getItem('user_id');
    return comment.user == id;
  }

  async vote (id:string, vote:string) {
    await this.commentService.voteComment(id,vote);
        if (vote == "true")this.comment.points+=1;
        else this.comment.points-=1;
    this.detachVoted();
  }

  async detachVoted() {
    await this.commentService.getVotedComments(localStorage.getItem('user_id')!).then(data => {
      this.votedMap.set(this.comment.id, false);
      
      this.votedComments = data;
      for (let d in data) {
        this.votedComments.push(data[d]);
        this.votedMap.set(data[d].id,true);
      }
    })
  }

}
