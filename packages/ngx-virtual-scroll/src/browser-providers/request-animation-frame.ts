export abstract class RequestAnimationFrameRef {
    abstract run(callback: (time: number) => void): void;
}

export class NativeRequestAnimationFrameRef extends RequestAnimationFrameRef {
    run(callback: (time: number) => void) {
        requestAnimationFrame(callback);
    }
}
