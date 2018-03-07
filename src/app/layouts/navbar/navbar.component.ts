import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notifications/notification.service';
declare var $:any;

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	public notifications = [];
	public notificationCount = 0;
	constructor(private _notificationService:NotificationService) { 
		this.getNotifications();
	}

	public getNotifications(){
		this._notificationService.getNotifications().subscribe(
			response=>{
				if(response.status){
					this.notificationCount = response.notifications.length;
					this.notifications = response.notifications;
				} 
			},
			error=>{}
			);
	} 

	public clearNotifications(){
		this.notificationCount = 0
		this._notificationService.clearNotifications().subscribe(
			respnse=>{}
			)
	}

	public logout(){
		localStorage.clear();
		window.location.reload();
	}

	public toggleChildLi($event){
		$($event.target).closest("li").find("._child_ul").slideToggle();
	}

	ngOnInit() {
		
	}

}
