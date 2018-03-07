import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/users/user.service';
import { NgProgressService } from 'ngx-progressbar';

declare var $:any;

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

	public loginDetails = {email:"", password:""};

	constructor(private _progressService:NgProgressService, private router:Router, private toastr: ToastrService, private _userService:UserService) { 

	}

	login(){

		if(this.loginDetails.email == ""){
			this.toastr.error('Please fill email');	
		} else if(this.loginDetails.password == ""){
			this.toastr.error('Please fill password');	
		} else {
			$("#overlay").show();
			this._progressService.start();
			this._userService.loginUser(this.loginDetails).subscribe(
				response => {
					if(response.status){
						localStorage.setItem('_login_token', response._JWTtoken);
						
						this.toastr.success('Login Successfull');
						window.location.reload();
					} else {
						this._progressService.done();
						if (typeof response.errors === "object") {
							for (let errorKey in response.errors) {
								this.toastr.error(response.errors[errorKey][0]);	
							}
						}
						else {
							this.toastr.error(response.message);
						}
					}
					this._progressService.done();
					$("#overlay").hide();
				},
				error => { 
					let self = this;
					if (error.status === 401) {
						this.toastr.error("Login Session expired");
						localStorage.clear();
						setTimeout(function () {
							self.router.navigateByUrl("login");
						}, 2000);
					}
				}
				);
		}
		
	}

	ngOnInit() {
	}

}
