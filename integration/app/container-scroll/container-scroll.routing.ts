import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { ContainerScrollComponent } from './container-scroll.component';

const containerScrollRoutes: Routes = [
    {
        path: '',
		component: ContainerScrollComponent
    }
];

@NgModule({
	imports: [
		RouterModule.forChild(containerScrollRoutes)
	],
	exports: [
		RouterModule
	]
})
export class ContainerScrollRoutingModule {}
