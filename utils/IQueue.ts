/**
 * Queue interface
 */
export default interface IQueue<T> {
    /**
     * Returns the number of elements in this queue
     */
    size(): number;

    /**
     * Add an item to the end of this queue
     *
     * @param {T} item The item to be added
     */
    enqueue(item: T): void;

    /**
     * Removes the object at the beginning of this queue and returns it
     *
     * @returns {T | null}
     */
    dequeue(): T | null;

    /**
     * Remove an item from the queue
     *
     * @param {T} item The item to be removed
     * @returns {boolean} true if the item was removed, false if the item was not found
     */
    remove(item: T): boolean;

    /**
     * Clear the queue
     */
    clear(): void;
}
