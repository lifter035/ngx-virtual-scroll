# ngx-virtual-scroll

## Installation

To install this library, run:

```bash
$ npm install ngx-virtual-scroll --save
```
```bash
$ yarn add ngx-virtual-scroll
```

## Using ngx-virtual-scroll

ngx-virtual-scroll is a directive that you can apply to any element in your Angular application to achieve virtual scroll performance for either window or container scroll.

#### Container scroll

You start by adding the `[ngxVirtualScrollFor]` tag on the container element that contains the elements that you want to have virtual scroll on:

```typescript
<ul 
    class="virtual-scroll-container"
    [ngxVirtualScrollFor]="collection"
    [containerHeight]="200"
    [defaultItemHeight]="30"
    (containerHeight$)="height = $event"
    (sliced$)="slice = $event"
>
    <div [style.height.px]="height">
        <li *ngFor="let item of slice.collection;"></li>
    </div>
</ul>
```

#### Window scroll

You start by adding the `[ngxVirtualScrollFor]` tag on the container element that contains the elements that you want to have virtual scroll on, then you use some other inputs to tell it to use window as scroll instead of container scroll:

```typescript
<ul 
    class="virtual-scroll-container"
    [ngxVirtualScrollFor]="collection"
    [useWindowScroll]="true"
    [defaultItemHeight]="30"
    (containerHeight$)="height = $event"
    (sliced$)="slice = $event"
    [style.height.px]="height"
>
    <li *ngFor="let item of slice.collection;"></li>
</ul>
```

**More details an examples about the use and API is comming soon.**

## License

MIT © [dineroregnskab](mailto:info@dinero.dk)
