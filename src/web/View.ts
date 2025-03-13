/**
 * @author afu
 * @license MIT
 */
import type { Context } from './Context.ts';
import type { JSONCompatible } from '../core/Types.ts';
import AbstractView from '../core/AbstractView.ts';
import Candy from '../Candy.ts';
import ImplementationException from '../core/ImplementationException.ts';
import RuntimeException from '../core/RuntimeException.ts';

/**
 * Web view
 *
 * A template engine should extends this class and implement the `renderFile` methods
 */
export default class View extends AbstractView {
    public context: Context | null = null;

    /**
     * Enable layout or not
     */
    public enableLayout: boolean = false;

    /**
     * Layout file path
     */
    public layout: string = 'app/views/layout';

    /**
     * Page title
     */
    public title: string = '';

    /**
     * Page keywords
     */
    public keywords: string = '';

    /**
     * Page description
     */
    public description: string = '';

    /**
     * Head assets
     */
    public headAssets: string[] | null = null;

    /**
     * Footer assets
     */
    public footerAssets: string[] | null = null;

    constructor() {
        super();
    }

    /**
     * Get head assets
     *
     * @returns {string}
     */
    public getHeadAssets(): string {
        return null === this.headAssets ? '' : this.headAssets.join('\n');
    }

    /**
     * Add head asset
     *
     * @param {string} asset Asset
     */
    public addHeadAsset(asset: string): void {
        if (null === this.headAssets) {
            this.headAssets = [];
        }

        this.headAssets.push(asset);
    }

    /**
     * Get footer assets
     *
     * @returns {string}
     */
    public getFooterAssets(): string {
        return null === this.footerAssets ? '' : this.footerAssets.join('\n');
    }

    /**
     * Add footer asset
     *
     * @param {string} asset Asset
     */
    public addFooterAsset(asset: string): void {
        if (null === this.footerAssets) {
            this.footerAssets = [];
        }

        this.footerAssets.push(asset);
    }

    /**
     * @inheritdoc
     */
    protected override findView(view: string): string {
        if ('@' === view.charAt(0)) {
            return Candy.getPathAlias(view) + this.defaultExtension;
        }

        if (null === this.context) {
            throw new RuntimeException('The context of the view is not set.');
        }

        const context = this.context;
        const app = this.context.application;

        // 模块无子目录 普通控制器有子目录
        if (null !== app.modules && '' !== context.moduleId) {
            return app.modules[context.moduleId] +
                '/views/' +
                view + this.defaultExtension;
        }

        return app.getAppPath() +
            '/views/' +
            context.viewPath +
            '/' +
            view + this.defaultExtension;
    }

    /**
     * @inheritdoc
     */
    protected override renderFile<T>(_file: string, _parameters: JSONCompatible<T> | null): Promise<string> {
        throw new ImplementationException('The method renderFile() is not implemented.');
    }
}
