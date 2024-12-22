/**
 * @author afu
 * @license MIT
 */

/**
 * File helper
 */
export default class FileHelper {
    /**
     * Get dirname
     *
     * @param {string} dir Directory path
     * @returns {string}
     */
    static getDirname(dir: string): string {
        dir = dir.replace(/\\/g, '/').replace(/\/[^\/]*\/?$/, '');

        return '' === dir ? '/' : dir;
    }

    /**
     * Normallize a directory path
     *
     * ```typescript
     * StringHelper.normalizePath('\\a\\b\\c')  // '/a/b/c'
     * StringHelper.normalizePath('/a/b/c/')  // '/a/b/c'
     * StringHelper.normalizePath('/a///b/c')  // '/a/b/c'
     * StringHelper.normalizePath('/a/./b/../c')  // '/a/c'
     * ```
     *
     * @param {string} path The path to be normalized
     * @param {string} directorySeparator The directory separator
     * @returns {string}
     */
    static normalizePath(path: string, directorySeparator: string = '/'): string {
        const ret = [];

        path = path.replace(/\\+/g, directorySeparator);
        if (directorySeparator === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        path = path.replace(/\/+/g, directorySeparator);

        for (let arr = path.split(directorySeparator), len = arr.length, i = 0; i < len; i++) {
            if ('.' === arr[i]) {
                continue;
            } else if ('..' === arr[i] && ret.length > 0) {
                ret.pop();
            } else {
                ret.push(arr[i]);
            }
        }

        return ret.join('/');
    }
}
