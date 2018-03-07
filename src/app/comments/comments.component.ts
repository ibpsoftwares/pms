import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TaskSharedService } from '../services/tasks/task.shared';
import { CommentsService } from '../services/comments/comments.service';

declare var $:any;

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

	@Input()
	public type:string;

	@Input()
	public sourceId:string;

	public commentDetails = { type:"", message:"",source_id:0};
	
	public singleTask:any;
	public commentStatus:boolean;
	public comments = [];

	constructor(private _taskSharedService:TaskSharedService, private _commentsService:CommentsService) { 
		
		this._taskSharedService.get_task().subscribe(
			task=> {
				this.singleTask = JSON.parse(task);
			}
			);
	}

	ngOnInit() {
	}

	public getComments(CommentData){
		this._commentsService.getComments(CommentData).subscribe(
			response=>{
				if(response.status){
					this.comments = response.comments;
				}
			},
			error=>{}
			)
	}


	ngAfterViewInit() {
		let commentData = { sourceId:this.sourceId, typeId:this.type };
		this.getComments(commentData);
		$("#loadingImg").hide();
	}

	eventHandler($event) {
		console.log($event.keyCode && !$event.shiftKey);
		if($event.keyCode == 13 && !$event.shiftKey){
			this.addComment();
		}
	}

	public addComment(){
		this.commentDetails.type = this.type;
		this.commentDetails.source_id = parseInt(this.sourceId);
		$("textarea[name='comments']").blur();
		this._commentsService.addComment(this.commentDetails).subscribe(
			response=>{
				if(response.status){
					this.comments.push(response.comment[0]);
					this.commentDetails.message = "";
				}
			},
			error=>{}
			);
	}

}
