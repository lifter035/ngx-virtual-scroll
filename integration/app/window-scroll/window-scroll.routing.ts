import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { WindowScrollComponent } from './window-scroll.component';

const windowScrollRoutes: Routes = [
    {
        path: '',
		component: WindowScrollComponent
    }
];

@NgModule({
	imports: [
		RouterModule.forChild(windowScrollRoutes)
	],
	exports: [
		RouterModule
	]
})
export class WindowScrollRoutingModule {}
