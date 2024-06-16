/**
 *
 * @param {String} overflowClass
 * Returns a show and hide overflow function that puts or
 * remove the `overflowClass` in the `document.body`
 */
export function useBodyOverflow(overflowClass?: string) {
    if (overflowClass) {
        return {
            hideOverflow() {
                document.body.classList.add(overflowClass);
            },
            showOverflow() {
                document.body.classList.remove(overflowClass);
            },
        };
    }
    // default tailwind
    return {
        hideOverflow() {
            document.body.classList.add("overflow-hidden", "absolute", "inset-0");
        },
        showOverflow() {
            document.body.classList.remove("overflow-hidden", "absolute", "inset-0");
        },
    };
}
