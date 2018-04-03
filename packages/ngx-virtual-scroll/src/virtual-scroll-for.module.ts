import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WindowRef, NativeWindowRef } from './browser-providers/window';
import { RequestAnimationFrameRef, NativeRequestAnimationFrameRef } from './browser-providers/request-animation-frame';
import { VirtualScrollForDirective } from './virtual-scroll-for.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        VirtualScrollForDirective
    ],
    exports: [
        VirtualScrollForDirective
    ]
})
export class NgxVirtualScrollModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxVirtualScrollModule,
            providers: [
                { provide: WindowRef, useClass: NativeWindowRef },
                { provide: RequestAnimationFrameRef, useClass: NativeRequestAnimationFrameRef }
            ]
        };
    }
}
