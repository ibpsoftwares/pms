import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { Location } from '@angular/common';
import { NgProgressService } from 'ngx-progressbar';

declare let $:any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

	public userDetails = {firstName:"",lastName:"",email:"",companyName:""};
	public userDeatilsGet:boolean = false;

	constructor(private router:Router, private _progressService:NgProgressService, private _userService:UserService, private toastr:ToastrService, private _location: Location) {
		this._progressService.start();
		this._userService.getSingleUser().subscribe(
			response => {
				if(response.status){
					this._progressService.done();
					this.userDeatilsGet = true;
					this.userDetails.firstName = response.user.first_name;
					this.userDetails.lastName = response.user.last_name;
					this.userDetails.companyName = response.user.company_name;
					this.userDetails.email = response.user.email;
				}
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

	/* Function that will send back to previous location */
	public back(){
		this._location.back();
	}

	updateUser(){
		let detailsStatus = this.validateDetails(this.userDetails);
		if(detailsStatus){
			this._userService.updateUser(this.userDetails).subscribe(
				response => {
					if(response.status){
						this.toastr.success(response.message)
					} else {
						if (typeof response.errors === "object") {
							for (var errorKey in response.errors) {
								this.toastr.error(response.errors[errorKey][0]);	
							}
						}
						else {
							this.toastr.error(response.message);
						}
					}
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

	/* FUnction that will check for empty values in userDetails */
	validateDetails(userDetails){
		if(this.userDetails.firstName == ""){
			this.toastr.error('Please enter first name');	
		} else if(this.userDetails.lastName == ""){
			this.toastr.error('Please enter last name');	
		} else if(this.userDetails.email == ""){
			this.toastr.error('Please enter email address');	
		}else if(this.userDetails.companyName == ""){
			this.toastr.error('Please enter company name');	
		} else {
			return true;
		}
	}

	ngOnInit() {
	}

}
