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
     * @param {T} element The element to be checked
     * @returns {boolean}
     */
    contains(element: T): boolean;

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {T} element The element to be searched
     * @returns {number}
     */
    indexOf(element: T): number;

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {T} element The element to be searched
     * @returns {number}
     */
    lastIndexOf(element: T): number;

    /**
     * Appends the specified element to the end of this list
     *
     * @param {T} element The element to be appended to this list
     */
    add(element: T): void;

    /**
     * Inserts the specified element at the specified position
     *
     * @param {number} index The position to insert
     * @param {T} element The element to be inserted
     * @returns {boolean}
     */
    insert(index: number, element: T): boolean;

    /**
     * Removes the first occurrence of the specified element from this list
     *
     * @param {T} element The element to be removed from this list
     * @returns {boolean}
     */
    remove(element: T): boolean;

    /**
     * Removes the element at the specified position in this list
     *
     * @param {number} index The position of the element to be removed
     */
    removeAt(index: number): T | null;

    /**
     * Returns the element at the specified position in this list
     *
     * @param {number} index The position of the element to be returned
     */
    get(index: number): T | null;

    /**
     * Replaces the element in the list with the specified element
     *
     * @param {number} index The position of the element to be replaced
     * @param {T} element The element to be stored at the specified position
     */
    set(index: number, element: T): T | null;

    /**
     * Removes all of the elements from this list
     */
    clear(): void;
}
