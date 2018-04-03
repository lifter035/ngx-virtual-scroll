import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgxVirtualScrollModule } from 'ngx-virtual-scroll';

import { ContainerScrollComponent } from './container-scroll.component';
import { ContainerScrollRoutingModule } from './container-scroll.routing';

@NgModule({
	imports: [
		CommonModule,
		ContainerScrollRoutingModule,
		NgxVirtualScrollModule.forRoot(),
	],
	declarations: [
		ContainerScrollComponent
	],
	bootstrap: [
		ContainerScrollComponent
	],
	exports: [
		ContainerScrollComponent
	]
})
export class ContainerScrollModule { }
