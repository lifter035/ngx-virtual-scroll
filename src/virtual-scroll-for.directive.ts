import {
    Directive,
    OnChanges,
    OnDestroy,
    AfterViewInit,
    ElementRef,
    Renderer2,
    ChangeDetectorRef,
    Input,
    Output,
    EventEmitter,
    SimpleChanges,
    NgZone
} from '@angular/core';

import { WindowRef } from './browser-providers/window';
import { RequestAnimationFrameRef } from './browser-providers/request-animation-frame';

import { ISubscription } from 'rxjs/Subscription';

export interface ForItem {}
export interface Slice {
    collection: ForItem[];
    offsets: number[];
    index: number;
}

@Directive({
    selector: '[ngxVirtualScrollFor]'
})
export class VirtualScrollForDirective implements AfterViewInit, OnChanges, OnDestroy {

    @Output() containerHeight$: EventEmitter<number> = new EventEmitter<number>();
    @Output() sliced$: EventEmitter<Slice> = new EventEmitter<Slice>();

    @Input() scrollToIndex$: EventEmitter<number> = new EventEmitter<number>();

    @Input() useWindowScroll = false;
    @Input() containerHeight = 0;
    @Input() fixedItemHeight = 0;
    @Input() defaultItemHeight = 0;

    @Input() getItemHeight: (item: ForItem) => number;
    @Input() getIndexScrollTop: () => number;

    @Input('ngxVirtualScrollFor')
    set originalCollection(collection: ForItem[]) {
        this._originalCollection = collection || [];
    }
    get originalCollection() {
        return this._originalCollection;
    }

    private _originalCollection: ForItem[] = [];
    private _collectionOffsets: number[] = [];
    private _scrollElement: Element;
    private _scrollBindingIsSet = false;
    private _scrollTop = 0;

    private _internalHeight = 0;
    private _internalScrollTop = 0;
    private _internalScrollHeight = 0;

    private _scrollToIndexSubscription: ISubscription;
    private _scrollListener: () => void;

    constructor(private _elementRef: ElementRef,
                private _renderer: Renderer2,
                private _changeDetectorRef: ChangeDetectorRef,
                private _zone: NgZone,
                private _windowRef: WindowRef,
                private _requestAnimationFrame: RequestAnimationFrameRef) {

        this.getItemHeight = () => {
            return this.defaultItemHeight;
        };

        this.getIndexScrollTop = () => {
            return 0;
        };
    }

    public ngAfterViewInit() {

        this._scrollToIndexSubscription = this.scrollToIndex$
            .subscribe((index: number) => this.scrollToOffsetByIndex(index));
    }

    public ngOnChanges(changes: SimpleChanges) {

        this._zone.runOutsideAngular(() => {
            if (this.useWindowScroll) {
                this.listenForWindowScroll();
            } else {
                this.listenForElementScroll();
            }
        });

        this._collectionOffsets = this.calculateOffsets(this._originalCollection);
        this.emitHeight();

        if (!this._internalScrollTop && !this._internalScrollHeight) {

            let [ top, height ] = this.getScrollTopAndHeight();

            this._internalScrollTop = top;
            this._internalScrollHeight = height;
        }

        this.executeSlicing(this._internalScrollTop, this._internalScrollHeight);
        this.scrollToOffset();
    }

    public ngOnDestroy() {

        if (typeof this._scrollListener === 'function') {
            this._scrollListener();
        }

        if (typeof this._scrollToIndexSubscription !== 'undefined') {
            this._scrollToIndexSubscription.unsubscribe();
        }
    }

    private listenForWindowScroll() {

        if (!this._scrollBindingIsSet) {

            this._scrollListener = this._renderer.listen(
                'window',
                'scroll',
                (e) => { this.handleScroll(); }
            );

            this._scrollBindingIsSet = true;
        }
    }

    private listenForElementScroll() {

        if (!this._scrollBindingIsSet) {

            this._scrollElement = this._elementRef.nativeElement;
            this._scrollListener = this._renderer.listen(
                this._scrollElement,
                'scroll',
                (e) => this.handleScroll()
            );

            this._scrollBindingIsSet = true;
        }
    }

    private handleScroll() {
        this._requestAnimationFrame.run(() => {

            let [ top, height ] = this.getScrollTopAndHeight();

            this._internalScrollTop = top;
            this._internalScrollHeight = height;

            this.executeSlicing(top, height);

            this._changeDetectorRef.detectChanges();
        });
    }

    private calculateOffsets(collection: ForItem[]) {

        let item;
        let height;
        let offset = this.fixedItemHeight;
        let offsets = [offset];
        let { length } = collection;
        let i = length;

        while (i > 0) {

            item = collection[ length - i ];
            height = this.getItemHeight(item);

            offset += height;
            offsets.push(offset);

            i--;
        }

        return offsets;
    }

    private emitHeight() {

        const lastIndex = this._collectionOffsets.length - 1;
        const height = this._collectionOffsets[lastIndex];

        if (this._internalHeight !== height) {
            this._internalHeight = height;
            this.containerHeight$.next(height);
        }
    }

    private executeSlicing(top: number, height: number) {

        let [ from, to ] = this.getSliceRange(this._collectionOffsets, top, height);

        const slicedCollection = this._originalCollection.slice(from, to);
        const slicedOffsets = this._collectionOffsets.slice(from, to);

        this.sliced$.next({
            collection: slicedCollection,
            offsets: slicedOffsets,
            index: from
        });
    }

    private getScrollTopAndHeight(): number[] {

        let top = 0;
        let height = 0;

        if (this.useWindowScroll) {
            top = -this._elementRef.nativeElement.getBoundingClientRect().top;
            height = top + this._windowRef.nativeWindow.innerHeight;
        } else {
            top = this._scrollElement.scrollTop;
            height = top + this.containerHeight;
        }

        return [ top, height ];
    }

    private getSliceRange(offsets: number[], scrollTop: number, scrollHeight: number): number[] {

        let { length } = offsets;
        let lastIndex = length - 1;
        let lastOffset = offsets[ lastIndex ];

        // Handle edge-cases.
        if (length === 0) {
            return [ 0, 0 ];
        }

        if (scrollHeight <= 0) {
            return [ 0, 1 ];
        }

        // Normalize the range.
        if (lastOffset < scrollHeight) {
            scrollHeight = lastOffset;
        }

        if (scrollTop < 0) {
            scrollTop = 0;
        }

        let from = 0;

        while (scrollTop > 0 && scrollTop >= offsets[ from ]) {
            from++;
        }

        let to = from;

        while (scrollHeight >= offsets[ to ]) {
            to++;
        }

        // Ensure edges are included
        from = (from > 0) ? from - 1 : from;
        to = to + 2;

        return [ from, to ];
    }

    private scrollToOffsetByIndex(index: number) {

        if (this.useWindowScroll) {

            const offset = this._collectionOffsets[index];
            if (typeof offset !== 'undefined' && offset !== null) {

                this._windowRef.scrollTo(this._windowRef.scrollLeft, offset);
            }
        }
    }

    private scrollToOffset() {

        if (!this.useWindowScroll) {

            const scrollTopIndex = this.getIndexScrollTop();
            if (scrollTopIndex > -1) {

                const itemOffset = this._collectionOffsets[scrollTopIndex];

                let offset = 0;
                let resultsContainerHeight = this.containerHeight - 50;
                let resultsContainerScrollTop = this._scrollTop;

                let itemOffsetAndHeight = itemOffset;

                if (itemOffsetAndHeight > (resultsContainerScrollTop + resultsContainerHeight)) {
                    offset = itemOffsetAndHeight - resultsContainerHeight;
                    this._scrollTop = offset;
                    this.setScrollOffset(this._scrollTop);
                    return;
                }

                if (itemOffset <= resultsContainerScrollTop) {
                    offset = itemOffset;
                    this._scrollTop = offset;
                    this.setScrollOffset(this._scrollTop);
                    return;
                }

                if (this._scrollTop === 0) {
                    this._scrollTop = 0;
                }

            } else {

                this._scrollTop = 0;
            }

            this.setScrollOffset(this._scrollTop);
        }
    }

    private setScrollOffset(scrollTop: number) {
        this._renderer.setProperty(this._elementRef.nativeElement, 'scrollTop', scrollTop);
    }
}
