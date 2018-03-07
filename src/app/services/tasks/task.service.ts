import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { apiRoutes } from "../../config/config";
import 'rxjs/Rx';
import { UserService } from '../users/user.service';

@Injectable()
export class TaskService {
    public header:any;
    constructor(private http: Http, private _userService:UserService) {
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + this._userService.getToken()
        });
    }

    public addTask(taskDetails:any){
        return this.http.post(apiRoutes.task.addTask,JSON.stringify(taskDetails), {headers: this.header}).map((response: Response) => response.json());
    }

    public updateTask(taskDetails:any){
        return this.http.patch(apiRoutes.task.updateTask,JSON.stringify(taskDetails), {headers: this.header}).map((response: Response) => response.json());
    }
    public deleteTask(taskId:any){
        return this.http.delete(apiRoutes.task.deleteTask+"/"+taskId, {headers: this.header}).map((response: Response) => response.json());
    }

    public getTasks(projectId:any){
        return this.http.get(apiRoutes.task.getTasks+"/"+projectId, {headers: this.header}).map((response: Response) => response.json());
    }

    public getPriority(){
        return this.http.get(apiRoutes.task.getPriority, {headers: this.header}).map((response: Response) => response.json());
    }

    public getSingleTask(taskId){
        return this.http.get(apiRoutes.task.getSingleTask+taskId, {headers: this.header}).map((response: Response) => response.json());
    }
}