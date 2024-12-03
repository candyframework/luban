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

    [Symbol.iterator]() {
        const keysIterator = this.headers.keys();
        let index = 0;

        return {
            next: () => {
                if (index++ < this.headers.size) {
                    const key = keysIterator.next().value as string;

                    return {
                        value: [key, this.get(key)],
                        done: false,
                    };
                }

                return { value: undefined, done: true };
            },
        };
    }

    /**
     * 获取一条 header
     *
     * @param {string} name the name of the header
     * @param {string} defaultValue
     * @return {string | undefined}
     */
    public get(name: string, defaultValue: string | undefined = undefined): string | undefined {
        name = name.toLowerCase();
        const header = this.headers.get(name);

        if (undefined === header) {
            return defaultValue;
        }

        return header.join(', ');
    }

    /**
     * 添加一条 header 如果有重名则覆盖
     *
     * @param {string} name the name of the header
     * @param {string} value the value of the header
     */
    public set(name: string, value: string): void {
        name = name.toLowerCase();

        this.headers.set(name, [value]);
    }

    /**
     * 添加一条 header 如果有重名则追加
     *
     * @param {string} name the name of the header
     * @param {string} value the value of the header
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
     * 是否存在 header
     *
     * @param {string} name the name of the header
     * @return {boolean}
     */
    public has(name: string): boolean {
        name = name.toLowerCase();

        return this.headers.has(name);
    }

    /**
     * 删除一条 header
     *
     * @param {string} name the name of the header
     * @return {boolean}
     */
    public remove(name: string): boolean {
        name = name.toLowerCase();

        return this.headers.delete(name);
    }

    /**
     * 删除所有 header
     */
    public clear(): void {
        this.headers.clear();
    }
}
