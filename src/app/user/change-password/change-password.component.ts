import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { NgProgressService } from 'ngx-progressbar';

declare var $:any;

@Component({
	selector: 'app-chnage-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {

	public passwordDetails = { currentPassword:"", newPassword:"", confirmPassword:"" };

	constructor(private _progressService:NgProgressService, private _userService:UserService, private router:Router, private _location: Location, private toastr:ToastrService) {

	}

	/* Function that will send back to previous location */
	public back(){
		this._location.back();
	}

	/* Function to change password */
	change_password(){
		let detailsStatus = this.validateDetails(this.passwordDetails);
		if(detailsStatus){
			$("#overlay").show();
			this._progressService.start();

			/* User service function that will update new password in database */
			this._userService.changePassword(this.passwordDetails).subscribe(
				response => {
					if(response.status){
						this.toastr.success(response.message);	
						this.router.navigate(['/dashboard']);
					} else {
						this._progressService.done();
						if (typeof response.errors === "object") {
							for (var errorKey in response.errors) {
								this.toastr.error(response.errors[errorKey][0]);	
							}
						}
						else {
							this.toastr.error(response.message);
						}
					}
					this._progressService.done();
					$("#overlay").show()
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
		if(this.passwordDetails.currentPassword == ""){
			this.toastr.error('Please enter current password.');	
		} else if(this.passwordDetails.newPassword == ""){
			this.toastr.error('Please enter new password.');	
		} else if(this.passwordDetails.confirmPassword == ""){
			this.toastr.error('Please confirm new password.');	
		} else {
			return true;
		}
	}

	ngOnInit() {

	}

}
