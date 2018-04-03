export abstract class WindowRef {
    abstract get nativeWindow(): WindowImplementationRef;
    abstract get scrollTop(): number;
    abstract get scrollLeft(): number;
    abstract scrollTo(x: number, y: number): void;
}

export interface WindowImplementationRef {
    innerHeight: number;
}

export function _window(): Window {
    return window;
}

export class NativeWindowRef extends WindowRef {
    get nativeWindow(): any {
        return _window();
    }

    get scrollTop(): number {
        return this.nativeWindow.scrollY || this.nativeWindow.pageYOffset;
    }

    get scrollLeft(): number {
        return this.nativeWindow.scrollX || this.nativeWindow.pageXOffset;
    }

    public scrollTo(x: number, y: number): void {
        this.nativeWindow.scrollTo(x, y);
    }
}
