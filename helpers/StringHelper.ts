/**
 * @author afu
 * @license MIT
 */

/**
 * String helper
 */
export default class StringHelper {
    /**
     * Find the number of times a substring appears
     *
     * @param {string} content The content to be searched
     * @param {string} find The string to find
     * @return {number}
     */
    static frequency(content: string, find: string): number {
        let num = 0;
        let x = content.indexOf(find);
        while (-1 !== x) {
            num++;
            x = content.indexOf(find, x + 1);
        }

        return num;
    }

    /**
     * Find the Nth occurrence of a string in another string
     *
     * @param {string} str The content to be searched
     * @param {string} find The string to find
     * @param {number} n The Nth occurrence
     * @return {number}
     */
    static nIndexOf(str: string, find: string, n: number): number {
        let x = str.indexOf(find);
        for (let i = 1; i < n; i++) {
            x = str.indexOf(find, x + 1);
        }

        return x;
    }

    /**
     * Trim char
     *
     * @param {string} str The string to be processed
     * @param {string} character The character to be removed
     * @return {string}
     */
    static trimChar(str: string, character: string): string {
        if (character === str.charAt(0)) {
            str = str.substring(1);
        }
        if (character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }

        return str;
    }

    /**
     * Trim left char
     *
     * @param {string} str The string to be processed
     * @param {string} character The character to be removed
     * @return {string}
     */
    static lTrimChar(str: string, character: string): string {
        if (character === str.charAt(0)) {
            str = str.substring(1);
        }

        return str;
    }

    /**
     * Trim right char
     *
     * @param {string} str The string to be processed
     * @param {string} character The character to be removed
     * @return {string}
     */
    static rTrimChar(str: string, character: string): string {
        if (character === str.charAt(str.length - 1)) {
            str = str.substring(0, str.length - 1);
        }

        return str;
    }

    /**
     * First letter to uppercase
     *
     * @param {string} str The string to be processed
     * @return {string}
     */
    static ucFirst(str: string): string {
        const ret = str.charAt(0).toUpperCase();

        return ret + str.substring(1);
    }

    /**
     * Filter tags
     *
     * ```
     * eg.
     * filterTags('<a>abc</a>xyz') -> abcxyz
     * filterTags('<a>abc</a>xyz', '<a><b>') -> <a>abc</a>xyz
     * ```
     *
     * @param {string} str The string to be processed
     * @param {string} allowed Allowed tags
     * @return {string}
     */
    static filterTags(str: string, allowed: string = ''): string {
        const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
        const comments = /<!--[\s\S]*?-->/gi;

        str = str.replace(comments, '');

        if ('' === allowed) {
            return str.replace(tags, '');
        }

        allowed = allowed.toLowerCase();

        // match 为匹配到的内容
        // p 为第一个子模式
        return str.replace(tags, (match, p) => {
            return allowed.indexOf('<' + p.toLowerCase() + '>') !== -1 ? match : '';
        });
    }
}
