/** creates an array of integers ranging from 0 to the specified count */
export function range(count: number) {
    return [...new Array(count).keys()];
}

export function isFirst<T>(arr: T[], val: T): boolean {
    return arr.length > 0 && arr[0] === val;
}

export function isLast<T>(arr: T[], val: T): boolean {
    return arr.length > 0 && arr[arr.length - 1] === val;
}

/**
 * Switches two elements in an array by their indices.
 * Returns a new array with the items in the new order.
 * @returns a new array with the items in the new order
 */
export function switchByIndex<T>(arr: T[], i: number, j: number): T[] {
    // guard array range
    if (i >= arr.length || i < 0 || j >= arr.length || j < 0)
        throw new Error("index out of bounds");
    // map-loop over the array, mapping each item to itself, except the specified indices to switch
    const indexMap = { [i]: j, [j]: i };
    const sieve = <T>(_: T, index: number) => arr[indexMap[index] ?? index];
    return arr.map(sieve);
}

/**
 * moves an element in the array up one index (in the sense that the first element of the item is the topmost).
 * Returns a new array with the items in the new order.
 * @returns a new array with the items in the new order
 */
export function moveIndexUp<T>(array: T[], index: number) {
    const indexAbove = Math.min(Math.max(0, index - 1), array.length - 1);
    return switchByIndex(array, index, indexAbove);
}

/**
 * moves an element in the array down one index (in the sense that the first element of the item is the topmost).
 * Returns a new array with the items in the new order.
 * @returns a new array with the items in the new order
 */
export function moveIndexDown<T>(array: T[], index: number) {
    const indexBelow = Math.min(Math.max(0, index + 1), array.length - 1);
    return switchByIndex(array, index, indexBelow);
}
