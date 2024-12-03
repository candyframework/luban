import type IList from './IList.ts';
import DataNode from './DataNode.ts';

/**
 * LinkedList
 */
export default class LinkedList<T> implements IList<T> {
    /**
     * The size of the List
     */
    private length: number = 0;

    /**
     * Pointer to first node
     */
    private headNode: DataNode | null = null;

    /**
     * Pointer to last node
     */
    private tailNode: DataNode | null = null;

    constructor() {}

    [Symbol.iterator]() {
        let node = this.headNode;

        return {
            next: (): { value: T | undefined; done: boolean } => {
                if (null !== node) {
                    const ret = { value: node.data, done: false };
                    node = node.next;

                    return ret;
                }

                return { value: undefined, done: true };
            },
        };
    }

    /**
     * Find node by index
     *
     * Before use, make sure the node exists!
     */
    private getNode(index: number): DataNode {
        let node: DataNode;

        if (index < (this.length >> 1)) {
            node = this.headNode!;
            for (let i = 0; i < index; i++) {
                node = node.next!;
            }

            return node;
        }

        node = this.tailNode!;
        for (let i = this.length - 1; i > index; i--) {
            node = node.previous!;
        }

        return node;
    }

    /**
     * Links element as last element
     */
    protected linkLast(element: any): void {
        const last = this.tailNode;
        const newNode = new DataNode(element, null, last);

        this.tailNode = newNode;
        if (null === last) {
            this.headNode = newNode;
        } else {
            last.next = newNode;
        }

        this.length++;
    }

    /**
     * Inserts element before node
     */
    protected linkBefore(element: any, node: DataNode): void {
        const prev = node.previous;
        const newNode = new DataNode(element, node, prev);

        node.previous = newNode;
        if (null === prev) {
            this.headNode = newNode;
        } else {
            prev.next = newNode;
        }

        this.length++;
    }

    /**
     * Unlinks node
     */
    protected unlink(node: DataNode): any {
        const data = node.data;
        const next = node.next;
        const prev = node.previous;

        if (null === prev) {
            this.headNode = next;
        } else {
            prev.next = next;
            node.previous = null;
        }

        if (null === next) {
            this.tailNode = prev;
        } else {
            next.previous = prev;
            node.next = null;
        }

        node.data = null;
        this.length--;

        return data;
    }

    /**
     * Returns the number of elements in this list
     */
    public size(): number {
        return this.length;
    }

    /**
     * Returns true if this list contains no elements
     */
    public isEmpty(): boolean {
        return 0 === this.length;
    }

    /**
     * Returns true if this list contains the specified element
     *
     * @param {any} element
     */
    public contains(element: any): boolean {
        return this.indexOf(element) >= 0;
    }

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     */
    public indexOf(element: any): number {
        let index = 0;
        for (let x = this.headNode; null !== x; x = x.next) {
            if (element === x.data) {
                return index;
            }

            index++;
        }

        return -1;
    }

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     */
    public lastIndexOf(element: any): number {
        let index = this.length;
        for (let x = this.tailNode; null !== x; x = x.previous) {
            index--;

            if (element === x.data) {
                return index;
            }
        }

        return -1;
    }

    /**
     * Appends the specified element to the end of this list
     *
     * @param {any} element
     */
    public add(element: T): void {
        this.linkLast(element);
    }

    /**
     * Inserts the specified element at the specified position
     *
     * @param {number} index
     * @param {any} element
     */
    public insert(index: number, element: T): boolean {
        if (index > this.length) {
            return false;
        }

        if (index === this.length) {
            this.linkLast(element);
        } else {
            this.linkBefore(element, this.getNode(index));
        }

        return true;
    }

    /**
     * Removes the first occurrence of the specified element from this list
     *
     * @param {any} element
     */
    public remove(element: any): boolean {
        for (let x = this.headNode; null !== x; x = x.next) {
            if (element === x.data) {
                this.unlink(x);
                return true;
            }
        }

        return false;
    }

    /**
     * Removes the element at the specified position in this list
     *
     * @param {number} index
     */
    public removeAt(index: number): T | null {
        if (index >= this.length) {
            return null;
        }

        return this.unlink(this.getNode(index));
    }

    /**
     * Returns the element at the specified position in this list
     *
     * @param {number} index
     */
    public get(index: number): T | null {
        if (index >= this.length) {
            return null;
        }

        return this.getNode(index).data;
    }

    /**
     * Replaces the element in the list with the specified element
     *
     * @param {number} index
     * @param {any} element
     */
    public set(index: number, element: T): T | null {
        if (index >= this.length) {
            return null;
        }

        const node = this.getNode(index);
        const oldValue = node.data;
        node.data = element;

        return oldValue;
    }

    /**
     * Removes all of the elements from this list
     */
    public clear(): void {
        for (let next = null, x = this.headNode; null !== x;) {
            next = x.next;

            x.data = null;
            x.next = null;
            x.previous = null;

            x = next;
        }

        this.length = 0;
        this.headNode = null;
        this.tailNode = null;
    }

    public toString(): string {
        let ret = '[ ';

        for (let current = this.headNode; null !== current; current = current.next) {
            ret += current.data + ', ';
        }
        ret = ret.substring(0, ret.lastIndexOf(', '));

        return ret + ' ]';
    }
}
