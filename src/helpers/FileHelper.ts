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

    /**
     * Create directory recursively
     *
     * @param {string} dir The directory path
     * @param {number} mode The directory mode
     */
    static async createDirectory(dir: string, mode: number = 0o777): Promise<void> {
        await Deno.mkdir(dir, { mode, recursive: true });
    }

    /**
     * Read a file
     *
     * @param {string} file The file path
     * @returns {string}
     */
    static readFile(file: string): Promise<string> {
        return Deno.readTextFile(file);
    }

    /**
     * @param {string} file The file to write
     * @param {string} content Content to write
     * @param {boolean} append Append or overwrite the file
     */
    static writeFile(file: string, content: string, append: boolean = false): Promise<void> {
        return Deno.writeTextFile(file, content, {
            append,
        });
    }
}
