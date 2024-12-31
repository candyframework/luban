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
    private headNode: DataNode<T> | null = null;

    /**
     * Pointer to last node
     */
    private tailNode: DataNode<T> | null = null;

    constructor() {}

    [Symbol.iterator](): Iterator<T | null> {
        let node = this.headNode;

        return {
            next: (): { value: T | null; done: boolean } => {
                if (null !== node) {
                    const ret = { value: node.data, done: false };
                    node = node.next;

                    return ret;
                }

                return { value: null, done: true };
            },
        };
    }

    /**
     * Find node by index
     *
     * Before use, make sure the node exists!
     */
    private getNode(index: number): DataNode<T> {
        let node: DataNode<T>;

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
    protected linkLast(element: T): void {
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
    protected linkBefore(element: T, node: DataNode<T>): void {
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
    protected unlink(node: DataNode<T>): T | null {
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
     * @inheritdoc
     */
    public size(): number {
        return this.length;
    }

    /**
     * @inheritdoc
     */
    public isEmpty(): boolean {
        return 0 === this.length;
    }

    /**
     * @inheritdoc
     */
    public contains(element: T): boolean {
        return this.indexOf(element) >= 0;
    }

    /**
     * @inheritdoc
     */
    public indexOf(element: T): number {
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
     * @inheritdoc
     */
    public lastIndexOf(element: T): number {
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
     * @inheritdoc
     */
    public add(element: T): void {
        this.linkLast(element);
    }

    /**
     * @inheritdoc
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
     * @inheritdoc
     */
    public remove(element: T): boolean {
        for (let x = this.headNode; null !== x; x = x.next) {
            if (element === x.data) {
                this.unlink(x);
                return true;
            }
        }

        return false;
    }

    /**
     * @inheritdoc
     */
    public removeAt(index: number): T | null {
        if (index >= this.length) {
            return null;
        }

        return this.unlink(this.getNode(index));
    }

    /**
     * @inheritdoc
     */
    public get(index: number): T | null {
        if (index >= this.length) {
            return null;
        }

        return this.getNode(index).data;
    }

    /**
     * @inheritdoc
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
     * @inheritdoc
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
