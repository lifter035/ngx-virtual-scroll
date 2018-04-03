import { Component, OnInit } from '@angular/core';
import { Slice } from 'ngx-virtual-scroll';

@Component({
	selector: 'app-container-scroll',
	template: `
		<ul 
			class="virtual-scroll"
			[ngxVirtualScrollFor]="collection"
			[containerHeight]="200"
            [getItemHeight]="getItemHeight"
            [getIndexScrollTop]="getIndexScrollTop"
			(containerHeight$)="height = $event"
			(sliced$)="slice = $event"
		>
			<div [style.height.px]="height" class="virtual-scroll-container">
				<ng-container *ngFor="let item of slice.collection; let i = index;">
					<li class="virtual-scroll-item" [style.top.px]="slice.offsets[i]">{{slice.index + i}}</li>
				</ng-container>
			</div>
		</ul>
  	`,
	styles: [`
		.virtual-scroll {
			max-height: 200px;
			position: relative;
			overflow-x: hidden;
			overflow-y: auto;
			margin: auto;
			padding: 1em;
			background-color: #fff;
			border-radius: 4px;
			max-width: 400px;
			box-shadow: 0px 3px 10px -1px rgba(0,0,0,0.1);
		}
		.virtual-scroll-container {
			position: relative;
		}
		.virtual-scroll-item {
			display: block;
			padding: 1em;
			clear: both;
			font-weight: normal;
			color: #333;
			cursor: pointer;
			backface-visibility: hidden;
			width: 100%;
			position: absolute;
			box-sizing: border-box;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
			background-color: #f5f5f5;
			border-radius: 4px;
		}
	`]
})
export class ContainerScrollComponent implements OnInit {

	public collection: any[] = [];
	public height: number = 0;
	public slice: Slice;

	public getItemHeight: Function;
    public getIndexScrollTop: Function;

	public ngOnInit() {
		this.getItemHeight = this.onGetItemHeight.bind(this);
		this.getIndexScrollTop = this.onGetIndexScrollTop.bind(this);
		
		this.collection = new Array(100);
	}

	public onGetItemHeight(item: any) {
		return 55;
	}

	public onGetIndexScrollTop() {
		return 0;
    }
}
