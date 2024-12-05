/**
 * Node
 */
export default class DataNode<T> {
    /**
     * The saved data
     */
    public data: T | null;

    /**
     * Pointer to next node
     */
    public next: DataNode<T> | null;

    /**
     * Pointer to previous node
     */
    public previous: DataNode<T> | null;

    constructor(data: T, next: DataNode<T> | null = null, previous: DataNode<T> | null = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}
