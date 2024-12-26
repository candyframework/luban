import type IList from './IList.ts';

/**
 * ArrayList
 */
export default class ArrayList<T> implements IList<T> {
    /**
     * The real size of the List
     */
    private length: number = 0;

    /**
     * The array that stored the elements
     */
    private elementData: (T | null)[] /* = null */;

    /**
     * Copy an array
     *
     * @param {any[]} src Array to be copied
     * @param {number} srcPos Start position of the source array
     * @param {any[]} dest Target array
     * @param {number} destPos Start position of the target array
     * @param {number} length The number of elements to be copied
     */
    static arrayCopy(src: any[], srcPos: number, dest: any[], destPos: number, length: number): void {
        let copied = 0;
        for (let i = srcPos; i < src.length; i++) {
            if (destPos < dest.length) {
                dest[destPos++] = src[i];
                copied++;
            }

            if (destPos >= dest.length || copied >= length) {
                break;
            }
        }
    }

    constructor(initialCapacity: number = 10) {
        this.elementData = new Array(initialCapacity);
    }

    [Symbol.iterator](): Iterator<T | null> {
        let index = 0;

        return {
            next: (): { value: T | null; done: boolean } => {
                if (index < this.length) {
                    const ret = { value: this.elementData[index], done: false };
                    index++;

                    return ret;
                }

                return { value: null, done: true };
            },
        };
    }

    private ensureCapacity(minCapacity: number): void {
        if (minCapacity - this.elementData.length > 0) {
            this.growCapacity(minCapacity);
        }
    }

    private growCapacity(minCapacity: number): void {
        const oldCapacity = this.elementData.length;
        let newCapacity = oldCapacity + (oldCapacity >> 1);

        if (newCapacity - minCapacity < 0) {
            newCapacity = minCapacity;
        }

        // overflow
        if (newCapacity > Number.MAX_SAFE_INTEGER) {
            newCapacity = Number.MAX_SAFE_INTEGER;
        }

        const dest = new Array(newCapacity);
        ArrayList.arrayCopy(this.elementData, 0, dest, 0, Math.min(oldCapacity, newCapacity));
        this.elementData = dest;
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
    public contains(element: T): boolean {
        return this.indexOf(element) >= 0;
    }

    /**
     * Returns the index of the first occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     */
    public indexOf(element: T): number {
        for (let i = 0; i < this.length; i++) {
            if (element === this.elementData[i]) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Returns the index of the last occurrence of the specified element in this list, or -1 if does not contain the element
     *
     * @param {any} element
     */
    public lastIndexOf(element: T): number {
        for (let i = this.length - 1; i >= 0; i--) {
            if (element === this.elementData[i]) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Appends the specified element to the end of this list
     *
     * @param {any} element The element to be appended to this list
     */
    public add(element: T): void {
        this.ensureCapacity(this.length + 1);

        this.elementData[this.length++] = element;
    }

    /**
     * Inserts the specified element at the specified position
     *
     * @param {number} index The position to insert
     * @param {any} element The element to insert
     */
    public insert(index: number, element: T): boolean {
        if (index > this.length) {
            return false;
        }

        this.ensureCapacity(this.length + 1);

        ArrayList.arrayCopy(
            this.elementData,
            index,
            this.elementData,
            index + 1,
            this.length - index,
        );

        this.elementData[index] = element;
        this.length++;

        return true;
    }

    /**
     * Removes the first occurrence of the specified element from this list
     *
     * @param {any} element
     */
    public remove(element: T): boolean {
        let move = 0;
        for (let i = 0; i < this.length; i++) {
            if (element === this.elementData[i]) {
                move = this.length - i - 1;
                if (move > 0) {
                    ArrayList.arrayCopy(this.elementData, i + 1, this.elementData, i, move);
                }
                this.elementData[--this.length] = null;
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

        const oldValue = this.elementData[index];
        const move = this.length - index - 1;
        if (move > 0) {
            ArrayList.arrayCopy(this.elementData, index + 1, this.elementData, index, move);
        }
        this.elementData[--this.length] = null;

        return oldValue;
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

        return this.elementData[index];
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

        const oldValue = this.elementData[index];
        this.elementData[index] = element;

        return oldValue;
    }

    /**
     * Removes all of the elements from this list
     */
    public clear(): void {
        for (let i = 0; i < this.length; i++) {
            this.elementData[i] = null;
        }

        this.length = 0;
    }

    public toString(): string {
        let ret = '[ ';

        for (const v of this) {
            ret += v + ', ';
        }
        ret = ret.substring(0, ret.lastIndexOf(', '));
        ret += ' ]';

        return ret;
    }
}
