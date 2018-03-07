import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/Rx';
import  { Observable } from 'rxjs';
import { apiRoutes } from "../../config/config";


@Injectable()
export class UserService {
    public header:any;
    constructor(private http: Http) {
        this.header = new Headers({
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + this.getToken()
        });
    }

    public getUserLoggedIn(){
        if(this.getToken() && this.getToken() !== null && this.getToken() != "" ){
            return true;
        }else{
            return false;
        }
    }

    getToken() {
        return localStorage.getItem('_login_token') || null;
    }

    public registerUser(userDetails:any){
        let userData = {first_name:userDetails.firstName, last_name:userDetails.lastName,company_name:userDetails.company_name, email:userDetails.email, password:userDetails.password, password_confirmation:userDetails.confirmPassword };
        return this.http.post(apiRoutes.user.addNewUser,JSON.stringify(userData), {headers: this.header}).map((response: Response) => response.json());
    }

    public updateUser(userDetails:any){
        let userData = {first_name:userDetails.firstName, last_name:userDetails.lastName,company_name:userDetails.companyName, email:userDetails.email };
        return this.http.post(apiRoutes.user.updateUser,JSON.stringify(userData), {headers: this.header}).map((response: Response) => response.json());
    }
    
    public changePassword(userDetails:any){
        let userData = {current_password:userDetails.currentPassword, password:userDetails.newPassword,password_confirmation:userDetails.confirmPassword };
        return this.http.post(apiRoutes.user.updateUserPassword,JSON.stringify(userData), {headers: this.header}).map((response: Response) => response.json());
    }

    public loginUser(userDetails:any){
        return this.http.post(apiRoutes.user.loginUser,JSON.stringify(userDetails), {headers: this.header}).map((response: Response) => response.json());
    }

    public getSingleUser(){
        return this.http.get(apiRoutes.user.getSingleUser, {headers: this.header}).map((response: Response) => response.json());
    }

    public getAllUsers(){
        return this.http.get(apiRoutes.user.getAllUsers, {headers: this.header}).map((response: Response) => response.json());
    }
}