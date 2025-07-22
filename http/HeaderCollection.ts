/**
 * @author afu
 * @license MIT
 */

/**
 * HTTP headers collection
 */
export default class HeaderCollection {
    /**
     * headers the headers in this collection
     *
     * header 头可能重复出现 所以这里以数组形式保存
     */
    private headers: Map<string, string[]> = new Map();

    constructor() {}

    [Symbol.iterator](): Iterator<[string, string] | undefined> {
        const keysIterator = this.headers.keys();
        let index = 0;

        return {
            next: (): { value: [string, string] | undefined; done: boolean } => {
                if (index++ < this.headers.size) {
                    const key = keysIterator.next().value as string;
                    const value = this.get(key) as string;

                    return {
                        value: [key, value],
                        done: false,
                    };
                }

                return { value: undefined, done: true };
            },
        };
    }

    /**
     * Get a header by name
     *
     * @param {string} name The name of the header
     * @returns {string | undefined}
     */
    public get(name: string): string | undefined {
        name = name.toLowerCase();
        const header = this.headers.get(name);

        if (undefined === header) {
            return undefined;
        }

        return header.join(', ');
    }

    /**
     * Add a header, if there is a duplicate name, it will be overwritten
     *
     * @param {string} name The name of the header
     * @param {string} value The value of the header
     */
    public set(name: string, value: string): void {
        name = name.toLowerCase();

        this.headers.set(name, [value]);
    }

    /**
     * Add a header, if there is a duplicate name, it will be appended
     *
     * @param {string} name The name of the header
     * @param {string} value The value of the header
     */
    public add(name: string, value: string): void {
        name = name.toLowerCase();
        const header = this.headers.get(name);

        if (undefined === header) {
            this.headers.set(name, [value]);
            return;
        }

        header.push(value);
    }

    /**
     * Check if a header exists
     *
     * @param {string} name The name of the header
     * @returns {boolean}
     */
    public has(name: string): boolean {
        name = name.toLowerCase();

        return this.headers.has(name);
    }

    /**
     * Delete a header
     *
     * @param {string} name The name of the header
     * @returns {boolean}
     */
    public remove(name: string): boolean {
        name = name.toLowerCase();

        return this.headers.delete(name);
    }

    /**
     * Delete all headers
     */
    public clear(): void {
        this.headers.clear();
    }
}
