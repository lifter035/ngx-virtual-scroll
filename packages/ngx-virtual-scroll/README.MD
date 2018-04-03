# ngx-virtual-scroll

## Installation

To install this library, run:

```bash
$ npm install ngx-virtual-scroll --save
```

## Using ngx-virtual-scroll

ngx-virtual-scroll is a directive that you can apply to any element in your Angular application to achieve virtual scroll performance for either window or container scroll.

#### Container scroll

You start by adding the `[ngxVirtualScrollFor]` tag on the container element that contains the elements that you want to have virtual scroll on:

```typescript
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
```

#### Window scroll

You start by adding the `[ngxVirtualScrollFor]` tag on the container element that contains the elements that you want to have virtual scroll on, then you use some other inputs to tell it to use window as scroll instead of container scroll:

```typescript
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
```

## Example 

`npm run start` will serve an example of both container and window scroll

## License

MIT © [dineroregnskab](mailto:info@dinero.dk)
