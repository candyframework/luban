/**
 * @author afu
 * @license MIT
 */
import type IApplication from './core/IApplication.ts';

/**
 * Asistant class
 */
export default class Candy {
    static defaultExtension: string = '.ts';

    static application: IApplication | null = null;

    static pathAliases: Map<string, string> = new Map([['@candy', import.meta.dirname!]]);

    /**
     * Get the actual path of alias
     *
     * @param {string} alias Alias name
     * @returns {string} Actual path
     */
    static getPathAlias(alias: string): string {
        if ('@' !== alias.charAt(0)) {
            return alias;
        }

        // alias
        const pos = alias.indexOf('/');
        const root = -1 === pos ? alias : alias.substring(0, pos);
        if (Candy.pathAliases.has(root)) {
            return -1 === pos
                ? Candy.pathAliases.get(root)!
                : Candy.pathAliases.get(root) + alias.substring(pos);
        }

        return '';
    }

    /**
     * Register a path alias
     *
     * @param {string} alias Alias name
     * @param {string} path Actual path
     */
    static setPathAlias(alias: string, path: string): void {
        if ('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        if ('/' === path.charAt(path.length - 1)) {
            path = path.substring(0, path.length - 1);
        }

        Candy.pathAliases.set(alias, path);
    }

    /**
     * Delete a path alias
     *
     * @param {string} alias Alias name
     */
    static deletePathAlias(alias: string): void {
        if ('@' !== alias.charAt(0)) {
            alias = '@' + alias;
        }

        Candy.pathAliases.delete(alias);
    }

    static async createObjectAsString(classPath: string, parameters: any): Promise<any> {
        const realClass = Candy.getPathAlias('@' + classPath);
        const ClassName = await import(realClass + Candy.defaultExtension);

        return new ClassName.default(parameters);
    }

    static configure(object: any, properties: any): any {
        for (const key in properties) {
            object[key] = properties[key];
        }

        return object;
    }
}
