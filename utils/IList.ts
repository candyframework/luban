/**
 * List interface
 */
export default interface IList<T> {
    /**
     * Returns the number of elements in this list
     *
     * @returns {number}
     */
    size(): number;

    /**
     * Returns true if this list contains no elements
     *
     * @returns {boolean}
     */
    isEmpty(): boolean;

    /**
     * Returns true if this list contains the specified element
     *
     * @param {any} element
     * @returns {boolean}
     */
    contains(element: any): boolean;

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     * @returns {number}
     */
    indexOf(element: any): number;

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     * @returns {number}
     */
    lastIndexOf(element: any): number;

    /**
     * Appends the specified element to the end of this list
     *
     * @param {any} element
     */
    add(element: T): void;

    /**
     * Inserts the specified element at the specified position
     *
     * @param {number} index
     * @param {any} element
     * @returns {boolean}
     */
    insert(index: number, element: T): boolean;

    /**
     * Removes the first occurrence of the specified element from this list
     *
     * @param {any} element
     * @returns {boolean}
     */
    remove(element: any): boolean;

    /**
     * Removes the element at the specified position in this list
     *
     * @param {number} index
     */
    removeAt(index: number): T | null;

    /**
     * Returns the element at the specified position in this list
     *
     * @param {number} index
     */
    get(index: number): T | null;

    /**
     * Replaces the element in the list with the specified element
     *
     * @param {number} index
     * @param {any} element
     */
    set(index: number, element: T): T | null;

    /**
     * Removes all of the elements from this list
     */
    clear(): void;
}
