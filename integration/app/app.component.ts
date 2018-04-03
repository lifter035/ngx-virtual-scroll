import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<div class="container">
			<div class="menu">
				<ul>
					<li><a [routerLink]="['container-scroll']">Container scroll</a></li>
					<li><a [routerLink]="['window-scroll']">Window scroll</a></li>
				</ul>
			</div>
			<div class="content">
				<router-outlet></router-outlet>
			</div>
		</div>
  	`,
	styles: [`
		.container {
			position: relative;
			padding-left: 300px;
		}

		.menu {
			position: fixed;
			width: 300px;
			left: 0;
			top: 0;
			bottom: 0;
			box-shadow: 0px 0px 32px -12px rgba(0,0,0,0.4);
			background-color: #fff;
		}
		.menu ul {
			list-style: none;
			margin: 0;
			padding: 1.5em;
		}
		.menu li {
			border-radius: 4px;
			background-color: #f7b03c;
			padding: 0.6em 0.9em;
			margin-bottom: 0.9em;
			box-shadow: 0px 2px 6px -1px rgba(0,0,0,0.1);
		}
		.menu a {
			display: block;
			text-decoration: none;
			color: white;
		}
		.content {
			padding: 1.5em;
		}
	`]
})
export class AppComponent {}
