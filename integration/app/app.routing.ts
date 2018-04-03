import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
		redirectTo: 'container-scroll',
		pathMatch: 'full'
    },
	{
		path: 'container-scroll',
		loadChildren: './container-scroll/container-scroll.module#ContainerScrollModule'
	},
	{
		path: 'window-scroll',
		loadChildren: './window-scroll/window-scroll.module#WindowScrollModule'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {}
