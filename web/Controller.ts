/**
 * @author afu
 * @license MIT
 */
import type Application from './Application.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type View from './View.ts';
import AbstractController from '../core/AbstractController.ts';
import Candy from '../Candy.ts';

export type ControllerContext = {
    application: Application;
    moduleId: string;
    controllerId: string;
    viewPath: string;
    request?: HttpRequest;
};

/**
 * Web controller
 */
export default abstract class Controller extends AbstractController {
    /**
     * Controller context
     */
    public context: ControllerContext;

    /**
     * View class
     */
    public view: View | null = null;

    constructor(context: ControllerContext) {
        super();
        this.context = context;
    }

    /**
     * Get view class
     */
    public async getView(): Promise<View> {
        if (null === this.view) {
            this.view = await Candy.createObjectAsString(
                this.context.application.defaultView,
                this.context,
            ) as View;
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
    public override async render(view: string, parameters?: unknown): Promise<string> {
        const instance = await this.getView();

        return instance.render(view, parameters);
    }

    /**
     * @inheritdoc
     */
    public abstract override run(request: HttpRequest): Promise<Response>;
}
