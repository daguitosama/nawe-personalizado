export class Timer {
    private startTime: number;
    constructor() {
        this.startTime = Date.now();
    }

    delta() {
        return Date.now() - this.startTime;
    }
}
