/**
 * @author afu
 * @license MIT
 */
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type View from './View.ts';
import type { Context } from './Context.ts';
import type { JSONCompatible } from '../core/Json.ts';
import AbstractController from '../core/AbstractController.ts';

/**
 * Web controller
 */
export default abstract class Controller extends AbstractController {
    /**
     * Controller context
     */
    public context: Context;

    /**
     * View class
     */
    public view: View | null = null;

    constructor(context: Context) {
        super();
        this.context = context;
    }

    /**
     * Get view class
     */
    public getView(): View {
        if (null === this.view) {
            this.view = new this.context.application.defaultView(this.context) as View;
        }

        return this.view;
    }

    /**
     * Set view class
     *
     * @param {View} view View class
     */
    public setView(view: View): void {
        this.view = view;
    }

    /**
     * @inheritdoc
     */
    public override render<T>(
        view: string,
        parameters: JSONCompatible<T> | null = null,
    ): Promise<string> {
        const instance = this.getView();

        return instance.render(view, parameters);
    }

    /**
     * @inheritdoc
     */
    public abstract override run(request: HttpRequest): Promise<HttpResponse>;
}
