import { Component, OnInit } from '@angular/core';
import { Slice } from 'ngx-virtual-scroll';

@Component({
	selector: 'app-window-scroll',
	template: `
		<ul 
			class="virtual-scroll"
			[ngxVirtualScrollFor]="collection"
			[useWindowScroll]="true"
            [getItemHeight]="getItemHeight"
            [getIndexScrollTop]="getIndexScrollTop"
			(containerHeight$)="height = $event"
			(sliced$)="slice = $event"
			[style.height.px]="height"
		>
			<ng-container *ngFor="let item of slice.collection; let i = index;">
				<li class="virtual-scroll-item" [style.top.px]="slice.offsets[i]">{{slice.index + i}}</li>
			</ng-container>
		</ul>
  	`,
	styles: [`
		.virtual-scroll {
			width: 100%;
			position: relative;
			margin: 0;
			padding: 0;
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
			background-color: #fff;
			border-radius: 4px;
			box-shadow: 0px 3px 10px -1px rgba(0,0,0,0.1);
		}
	`]
})
export class WindowScrollComponent implements OnInit {

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
		return 60; // extra 10px for margin between rows
	}

	public onGetIndexScrollTop() {
		return 0;
    }
}
