import {Component, Injectable, Input, Output, EventEmitter} from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { apiRoutes } from "../../config/config";
import 'rxjs/Rx';
import { UserService } from '../users/user.service';

@Injectable()
export class CommentsService {
    public header:any;

    @Output() sourceId: EventEmitter<any> = new EventEmitter();
    constructor(private http: Http, private _userService:UserService) {
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + this._userService.getToken()
        });
    }

    public getSourceId() {
        return this.sourceId;
    }

    public setSourceId(id:any){
        this.sourceId.emit(id);
    }

    public addComment(commentDetails:any){
        return this.http.post(apiRoutes.comment.addComment,JSON.stringify(commentDetails), {headers: this.header}).map((response: Response) => response.json());
    }

    public getComments(commentsDetails:any){
        return this.http.post(apiRoutes.comment.getComments,JSON.stringify(commentsDetails), {headers: this.header}).map((response: Response) => response.json());
    }
}