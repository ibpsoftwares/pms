import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { apiRoutes } from "../../config/config";
import 'rxjs/Rx';
import { UserService } from '../users/user.service';

@Injectable()
export class ProjectService {
    public header:any;
    constructor(private http: Http, private _userService:UserService) {
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + this._userService.getToken()
        });
    }

    public addProject(projectDetails:any){
        return this.http.post(apiRoutes.project.addProject,JSON.stringify(projectDetails), {headers: this.header}).map((response: Response) => response.json());
    }

    public getProjecthandle(projectName){
        return this.http.get(apiRoutes.project.getProjecthandle+"/"+projectName, {headers: this.header}).map((response: Response) => response.json());
    }

    public getAllProjects(){
        return this.http.get(apiRoutes.project.getAllProjects, {headers: this.header}).map((response: Response) => response.json());
    }

    public getSingleProject(projectHandle:string){
        return this.http.get(apiRoutes.project.getSingleProject+"/"+projectHandle, {headers: this.header}).map((response: Response) => response.json());
    }

    public updateProject(projectDetails:any){
        return this.http.post(apiRoutes.project.updateProject,JSON.stringify(projectDetails), {headers: this.header}).map((response: Response) => response.json());
    }

    public deleteProject(handleName:any){
        return this.http.delete(apiRoutes.project.deleteProject+"/"+handleName, {headers: this.header}).map((response: Response) => response.json());
    }

    public getAllStatuses(){
        return this.http.get(apiRoutes.status.getAllStatuses, {headers: this.header}).map((response: Response) => response.json());
    }
}