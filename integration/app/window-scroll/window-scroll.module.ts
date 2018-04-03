import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxVirtualScrollModule } from 'ngx-virtual-scroll';

import { WindowScrollComponent } from './window-scroll.component';
import { WindowScrollRoutingModule } from './window-scroll.routing';

@NgModule({
	imports: [
		CommonModule,
		WindowScrollRoutingModule,
		NgxVirtualScrollModule.forRoot(),
	],
	declarations: [
		WindowScrollComponent
	],
	bootstrap: [
		WindowScrollComponent
	],
	exports: [
		WindowScrollComponent
	]
})
export class WindowScrollModule { }
