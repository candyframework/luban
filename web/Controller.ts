/**
 * @author afu
 * @license MIT
 */
import type Application from './Application.ts';
import AbstractController from '../core/AbstractController.ts';

export type ControllerContext = {
    application: Application;
    moduleId: string;
    controllerId: string;
    viewPath: string;
    request?: Request;
};

/**
 * Web controller
 */
export default class Controller extends AbstractController {
    public context: ControllerContext;

    constructor(context: ControllerContext) {
        super();
        this.context = context;
    }

    public override render(view: string, parameters?: any): string {
        throw new Error('Method not implemented.');
    }

    public override run(_request: Request): Promise<Response> {
        throw new Error('Method of run() not implemented.');
    }
}
