import ArrayList from './ArrayList.ts';

/**
 * Stack
 */
export default class Stack<T> extends ArrayList<T> {
    /**
     * Push an item onto the top of this stack
     *
     * @param {any} item
     */
    public push(item: T): void {
        this.add(item);
    }

    /**
     * Removes the object at the top of this stack and returns it
     */
    public pop(): T | null {
        const len = this.size();

        return this.removeAt(len - 1);
    }

    /**
     * Check if this stack is empty
     */
    public empty(): boolean {
        return 0 === this.size();
    }
}
