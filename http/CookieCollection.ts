/**
 * @author afu
 * @license MIT
 */

/**
 * HTTP cookies collection
 */
export default class CookieCollection {
    /**
     * cookies the cookies in this collection
     */
    private cookies: Map<string, string> = new Map();

    constructor() {}

    [Symbol.iterator]() {
        let index = 0;
        const keysIterator = this.cookies.keys();

        return {
            next: () => {
                if (index++ < this.cookies.size) {
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
     * 获取一条 cookie
     *
     * @param {string} name the name of the cookie
     * @param {string} defaultValue
     * @return {string | undefined}
     */
    public get(name: string, defaultValue: string | undefined = undefined): string | undefined {
        name = name.toLowerCase();
        const cookie = this.cookies.get(name);

        if (undefined === cookie) {
            return defaultValue;
        }

        return cookie;
    }

    /**
     * 添加一条 cookie 如果有重名则覆盖
     *
     * @param {string} name the name of the cookie
     * @param {string} value the value of the cookie
     */
    public set(name: string, value: string): void {
        name = name.toLowerCase();

        this.cookies.set(name, value);
    }

    /**
     * 是否存在 cookie
     *
     * @param {String} name the name of the cookie
     * @return {Boolean}
     */
    public has(name: string): boolean {
        name = name.toLowerCase();

        return this.cookies.has(name);
    }

    /**
     * 删除一条 cookie
     *
     * @param {String} name the name of the cookie
     * @return {Boolean}
     */
    public remove(name: string): boolean {
        name = name.toLowerCase();

        return this.cookies.delete(name);
    }

    /**
     * 删除所有 cookie
     */
    public clear(): void {
        this.cookies.clear();
    }
}
