import type IQueue from './IQueue.ts';
import LinkedList from './LinkedList.ts';

/**
 * LinkedQueue
 */
export default class LinkedQueue<T> extends LinkedList<T> implements IQueue<T> {
    /**
     * @inheritdoc
     */
    enqueue(item: T): void {
        this.add(item);
    }

    /**
     * @inheritdoc
     */
    dequeue(): T | null {
        return this.removeAt(0);
    }
}
