import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { UserService } from './services/users/user.service';

declare var $:any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	 public layout: string = "default";

	constructor(private router: Router, private _userService:UserService){
		const emptyView = [
            '/login',
            '/register',
            '/forgot-password',
            '/'
        ];
        const self = this;

        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
                const copy = Object.assign({}, val);
                // using split here to remove query string from url if exist
                const url = copy.url.split(/[?#]/)[0];
                if ($.inArray(url, emptyView) >= 0) {
                    if(this._userService.getUserLoggedIn()){
                        this.router.navigate(['/dashboard']);
                    }
                    $("body").addClass("login_bg");
                    self.layout = "empty";
                } else {
                    if(!this._userService.getUserLoggedIn()){
                        this.router.navigate(['/login']);
                    }
                	self.layout = "dashboard";
                    $("body").removeClass("login_bg");
                }
            }
        });
	}
}
