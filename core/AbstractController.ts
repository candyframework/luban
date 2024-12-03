/**
 * @author afu
 * @license MIT
 */
import type IController from './IController.ts';
import ActionEvent from './ActionEvent.ts';
import Event from './Event.ts';

/**
 * @author afu
 * @license MIT
 */
export default abstract class AbstractController extends Event implements IController {
    static EVENT_BEFORE_ACTION: string = 'beforeAction';

    static EVENT_AFTER_ACTION: string = 'afterAction';

    /**
     * the filter collection
     */
    // public filterChain: FilterChain;

    /**
     * @inheritdoc
     */
    public beforeAction(actionEvent: ActionEvent): void {
        this.trigger(AbstractController.EVENT_BEFORE_ACTION, actionEvent);
    }

    /**
     * @inheritdoc
     */
    public afterAction(actionEvent: ActionEvent): void {
        this.trigger(AbstractController.EVENT_AFTER_ACTION, actionEvent);
    }

    /**
     * @inheritdoc
     */
    public filters(): string[] | null {
        return null;
    }

    public async runControllerAction(request: Request): Promise<Response> {
        const actionEvent = new ActionEvent();
        actionEvent.request = request;

        this.beforeAction(actionEvent);

        if (false === actionEvent.valid) {
            return new Response(actionEvent.data);
        }

        // const data = await this.filterChain.doFilter(request);
        const res = await this.run(request);

        this.afterAction(actionEvent);

        return res;
    }

    /**
     * @inheritdoc
     */
    public abstract render(view: string, parameters?: unknown): string;

    /**
     * @inheritdoc
     */
    public abstract run(request: Request): Promise<Response>;
}
