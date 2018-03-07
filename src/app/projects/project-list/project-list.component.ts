import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ProjectService } from '../../services/projects/project.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { NgProgressService } from 'ngx-progressbar';
import { DatePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
declare let $:any;

@Component({
	selector: 'app-project-list',
	templateUrl: './project-list.component.html',
	styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

	public projects = [];
	public projectDetails:boolean;
	public noProjectFound:boolean;
	public currentProjectHandle:string;
	today = Date.now();
	constructor(private _progressService:NgProgressService, private toastr:ToastrService, private _projectService:ProjectService, private router:Router) {
		this.getAllProjects();
	}

	ngOnInit() {}

	/* Function that will get all projects of the current user and also projects which are asigned to login user */
	public getAllProjects(){
		this._progressService.start();
		this._projectService.getAllProjects().subscribe(
			response=>{
				
				if(response.status){
					this._progressService.done();
					this.projectDetails = true;
					this.projects = response.projects;
				} else {
					this._progressService.done();
					this.projectDetails = false;
					this.noProjectFound = true;
					alert()
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

	/* Function that will delete project and its assignees form database */
	public deleteProject(){
		$(".loading").css("display","block");
		this._projectService.deleteProject(this.currentProjectHandle).subscribe(
			response=>{
				if(response.status){
					$(".loading").css("display","none");
					this.toastr.success(response.message);
					$("table").find("."+this.currentProjectHandle).remove();
					if($("table").find("tr").length == 1){
						this.projectDetails = false;
						this.noProjectFound = true;
					}
				} else {
					this.toastr.error(response.message);
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
			)
	}

}
