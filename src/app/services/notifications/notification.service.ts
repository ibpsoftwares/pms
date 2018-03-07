import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { apiRoutes } from "../../config/config";
import 'rxjs/Rx';
import { UserService } from '../users/user.service';

@Injectable()
export class NotificationService {
    public header:any;
    constructor(private http: Http, private _userService:UserService) {
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + this._userService.getToken()
        });
    }

    public getNotifications(){
        return this.http.get(apiRoutes.notification.getNotifications, {headers: this.header}).map((response: Response) => response.json());
    }

    public clearNotifications(){
        return this.http.get(apiRoutes.notification.clearNotification, {headers: this.header}).map((response: Response) => response.json());    
    }
}