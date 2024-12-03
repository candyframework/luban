/**
 * Node
 */
export default class DataNode {
    /**
     * The saved data
     */
    public data: any;

    /**
     * Pointer to next node
     */
    public next: DataNode | null;

    /**
     * Pointer to previous node
     */
    public previous: DataNode | null;

    constructor(data: any, next: DataNode | null = null, previous: DataNode | null = null) {
        this.data = data;
        this.next = next;
        this.previous = previous;
    }
}
