export function new_timer() {
    var _start = Date.now();
    return {
        delta() {
            return Date.now() - _start;
        },
    };
}
