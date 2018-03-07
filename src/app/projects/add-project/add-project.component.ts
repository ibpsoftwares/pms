import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/projects/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { NgProgressService } from 'ngx-progressbar';

declare var $:any;

@Component({
	selector: 'app-add-project',
	templateUrl: './add-project.component.html',
	styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

	public projectDetails = { name:"", handle:"", status:1, privacy_status:0, description:"", users:"" };
	public users = [];

	constructor(private _progressService:NgProgressService, private _userService:UserService, private router:Router, private _location:Location, private _projectService:ProjectService, private toastr:ToastrService) { 
		
		/* Call to API section which will get all users from database */
		this._userService.getAllUsers().subscribe(
			response=>{
				this.users = response.users;
			},
			error=>{},
			);
	}

	ngOnInit() {
	}

	ngAfterViewInit(){
		$("select[name='assignees']").select2({
			tags: false,
			theme: "bootstrap",
		});

		$("#projectDescription").Editor({
			status_bar:false
		});
	}

	/* Function that will send back to previous location */
	public back(){
		this._location.back();
	}

	/* Function will be called on blur of handle textfield to remove white spaces and convert handle to lower case */
	public validateHandle(){
		if(this.projectDetails.handle!==""){
			this.projectDetails.handle = this.projectDetails.handle.toLowerCase();
			this.projectDetails.handle = this.projectDetails.handle.replace(" ","-");
		}
	}

	/* Function to get autogenrated handle of project depending upon project name */
	public getProjectHandle(){

		if(this.projectDetails.name == ""){
			return false;
		}
		this._progressService.start();
		
		/* project service function that will get handle for project from backend */
		this._projectService.getProjecthandle(this.projectDetails.name).subscribe(
			response => {
				if(response.status){
					this._progressService.done();
					this.projectDetails.handle = response.handle;
				} else {
					
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

	/* Function that will add new project in database */
	public addProject(){
		let detailsStatus = this.validateDetails();

		this.projectDetails.privacy_status = parseInt($("input[name='optradio']:checked").val());

		if($("select[name='assignees']").val()!== null && $("select[name='assignees']").val()!==""){
			this.projectDetails.users = $("select[name='assignees']").val().join(",");
		}

		this.projectDetails.description = $("#projectDescription").closest("div").find(".Editor-container .Editor-editor").html();
		if(detailsStatus){
			$("#overlay").show()
			this._progressService.start();
			
			/* project service function that will create new project in database */
			this._projectService.addProject(this.projectDetails).subscribe(
				response => {
					if(response.status){
						this.toastr.success(response.message);	
						this.router.navigate(['/dashboard/projects']);
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

	/* Function that will check for empty values in userDetails */
	validateDetails(){
		if(this.projectDetails.name == ""){
			this.toastr.error('Please enter project name.');	
		} else if(this.projectDetails.handle == ""){
			this.toastr.error('Please enter project handle.');	
		} else {
			return true;
		}
	}

}
