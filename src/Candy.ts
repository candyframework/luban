/**
 * @author afu
 * @license MIT
 */
import type IApplication from './core/IApplication.ts';
import FileHelper from './helpers/FileHelper.ts';

/**
 * Asistant class
 */
export default class Candy {
    static defaultExtension: string = '.ts';
    static application: IApplication | null = null;
    static pathAliases: Map<string, string> = new Map([['@luban', import.meta.dirname!]]);

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
        const path = Candy.pathAliases.get(root);
        if (undefined !== path) {
            return -1 === pos ? path : path + alias.substring(pos);
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

    /**
     * Create an object with the specified configuration
     */
    static createObject<T>(clazz: { classType: new () => T; [key: string]: any }): T {
        const instance = new clazz.classType();

        Reflect.deleteProperty(clazz, 'classType');
        Candy.configure(instance, clazz);

        return instance;
    }

    /**
     * Create an object with the specified class path
     */
    static async createObjectAsString(classPath: string, parameters: any = null): Promise<any> {
        const realClass = Candy.getPathAlias('@' + classPath) + Candy.defaultExtension;
        const path = Candy.toFilePath(realClass);
        const ClassName = await import(path);

        return new ClassName.default(parameters);
    }

    static toFilePath(absolutePath: string): string {
        return 'file://' + FileHelper.normalizePath(absolutePath, '/');
    }

    static configure(object: any, properties: any): any {
        for (const key in properties) {
            object[key] = properties[key];
        }

        return object;
    }
}
