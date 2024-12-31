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
     * @param {T[]} src Array to be copied
     * @param {number} srcPos Start position of the source array
     * @param {T[]} dest Target array
     * @param {number} destPos Start position of the target array
     * @param {number} length The number of elements to be copied
     */
    static arrayCopy<T>(src: T[], srcPos: number, dest: T[], destPos: number, length: number): void {
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

        const dest = new Array<T>(newCapacity);
        ArrayList.arrayCopy(this.elementData, 0, dest, 0, Math.min(oldCapacity, newCapacity));
        this.elementData = dest;
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
        for (let i = 0; i < this.length; i++) {
            if (element === this.elementData[i]) {
                return i;
            }
        }

        return -1;
    }

    /**
     * @inheritdoc
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
     * @inheritdoc
     */
    public add(element: T): void {
        this.ensureCapacity(this.length + 1);

        this.elementData[this.length++] = element;
    }

    /**
     * @inheritdoc
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
     * @inheritdoc
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
     * @inheritdoc
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
     * @inheritdoc
     */
    public get(index: number): T | null {
        if (index >= this.length) {
            return null;
        }

        return this.elementData[index];
    }

    /**
     * @inheritdoc
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
     * @inheritdoc
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
