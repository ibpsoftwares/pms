import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/projects/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { NgProgressService } from 'ngx-progressbar';

declare var $:any;

@Component({
	selector: 'app-edit-project',
	templateUrl: './edit-project.component.html',
	styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

	public projectDetails = {id:0, name:"", handle:"", status:1, privacy_status:0, description:"", users:"" };
	public users = [];
	public projectAssignees = [];
	public statuses = [];
	public editProjectStatus:boolean = false;

	constructor(private _progressService:NgProgressService, private _userService:UserService, private router:Router, private _location:Location, private _projectService:ProjectService, private toastr:ToastrService) { 
		this.getAllUsers();
		this.getProjectByHandle();
		this.getStatus();
	}

	ngAfterViewInit(){
		
	}

	ngOnInit() {
	}

	public getProjectByHandle(){
		this._progressService.start();
		this._projectService.getSingleProject(this.router.url.split("/")[4]).subscribe(
			response=>{
				if(response.status){
					this.editProjectStatus = true;
					this._progressService.done();
					this.setProjectDetails(response);
				} else {
					this.router.navigate(["/dashboard/projects"]);
				}
			},
			error=>{
				let self = this;
				if (error.status === 401) {
					this.toastr.error("Login Session expired");
					localStorage.clear();
					setTimeout(function () {
						self.router.navigateByUrl("login");
					}, 2000);
				}
			},
			);
	}

	public setProjectDetails(response:any){
		this.projectDetails.id = response.project.id;
		this.projectDetails.name = response.project.name;
		this.projectDetails.handle = response.project.handle;
		this.projectDetails.status = response.project.status;
		this.projectDetails.privacy_status = response.project.privacy_status;
		this.projectDetails.description = response.project.description;

		$("select[name='assignees']").select2({
			placeholder:"Select Assignees",
			width:"100%"
		});
		$("#projectDescription").Editor({
			status_bar:false
		});
		
		$("#projectDescription").closest("div").find(".Editor-container .Editor-editor").html(this.projectDetails.description);
		this.setAssignees(response.project.assignees);
	}

	public getStatus(){
		this._projectService.getAllStatuses().subscribe(
			response=>{
				if(response.status){
					this.statuses = response.statuses;
				} else {
					this.router.navigate(["/dashboard/projects"]);
				}
			},
			error=>{
				let self = this;
				if (error.status === 401) {
					this.toastr.error("Login Session expired");
					localStorage.clear();
					setTimeout(function () {
						self.router.navigateByUrl("login");
					}, 2000);
				}
			},
			);
	}

	/* Function that will send back to previous location */
	public back(){
		this._location.back();
	}

	public setAssignees(assignees){
		for(let assignee in assignees){
			this.projectAssignees.push(assignees[assignee].user_id)
		}
		$("select[name='assignees']").val(this.projectAssignees).trigger("change");
	}

	public getAllUsers(){
		this._userService.getAllUsers().subscribe(
			response=>{
				this.users = response.users;

			},
			error=>{
				let self = this;
				if (error.status === 401) {
					this.toastr.error("Login Session expired");
					localStorage.clear();
					setTimeout(function () {
						self.router.navigateByUrl("login");
					}, 2000);
				}
			},
			);
	}

	public updateProject(){
		this._progressService.start();
		let detailsStatus = this.validateDetails();
		if(!detailsStatus){
			return false;
		}
		this.projectDetails.privacy_status = parseInt($("input[name='optradio']:checked").val());

		if($("select[name='assignees']").val()!== null && $("select[name='assignees']").val()!==""){
			this.projectDetails.users = $("select[name='assignees']").val().join(",");
		}
		$("#overlay").show();
		this.projectDetails.description = $("#projectDescription").closest("div").find(".Editor-container .Editor-editor").html();

		this._projectService.updateProject(this.projectDetails).subscribe(
			response=>{

				if(response.status){
					this.toastr.success(response.message);
					this.router.navigate(["/dashboard/projects"]);
				} else {
					this.toastr.error(response.message);
				}
				this._progressService.done();
				$("#overlay").hide();
			},
			error=>{
				let self = this;
				if (error.status === 401) {
					this.toastr.error("Login Session expired");
					localStorage.clear();
					setTimeout(function () {
						self.router.navigateByUrl("login");
					}, 2000);
				}
			},
			);	
	}

	/* Function that will check for empty values in userDetails */
	public validateDetails(){
		if(this.projectDetails.name == ""){
			this.toastr.error('Please enter project name.');	
		} else if(this.projectDetails.handle == ""){
			this.toastr.error('Project handle cannot be empty.');	
		} else if(this.projectDetails.status == 0){
			this.toastr.error('Select valid status of project.');	
		} else {
			return true;
		}
	}

	public validateHandle(){
		if(this.projectDetails.handle!==""){
			this.projectDetails.handle = this.projectDetails.handle.toLowerCase();
			this.projectDetails.handle = this.projectDetails.handle.replace(" ","-");
		}
	}

}
