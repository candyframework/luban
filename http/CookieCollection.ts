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
     * Get a cookie by name
     *
     * @param {string} name The name of the cookie
     * @returns {string | undefined}
     */
    public get(name: string): string | undefined {
        name = name.toLowerCase();

        return this.cookies.get(name);
    }

    /**
     * Add a cookie, if there is a duplicate name, it will be overwritten
     *
     * @param {string} name the name of the cookie
     * @param {string} value the value of the cookie
     */
    public set(name: string, value: string): void {
        name = name.toLowerCase();

        this.cookies.set(name, value);
    }

    /**
     * Check if a cookie exists
     *
     * @param {string} name the name of the cookie
     * @returns {boolean}
     */
    public has(name: string): boolean {
        name = name.toLowerCase();

        return this.cookies.has(name);
    }

    /**
     * Delete a cookie
     *
     * @param {string} name the name of the cookie
     * @returns {boolean}
     */
    public remove(name: string): boolean {
        name = name.toLowerCase();

        return this.cookies.delete(name);
    }

    /**
     * Delete all cookies
     */
    public clear(): void {
        this.cookies.clear();
    }
}
