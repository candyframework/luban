/**
 * @author afu
 * @license MIT
 */
import type FilterChain from './FilterChain.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import type IController from './IController.ts';
import type IFilter from './IFilter.ts';
import type { JSONCompatible } from './Json.ts';
import ActionEvent from './ActionEvent.ts';
import Event from './Event.ts';
import FilterFactory from './FilterFactory.ts';

/**
 * Abstract controller
 */
export default abstract class AbstractController extends Event implements IController {
    /**
     * The event before action
     */
    static EVENT_BEFORE_ACTION: string = 'beforeAction';

    /**
     * The event after action
     */
    static EVENT_AFTER_ACTION: string = 'afterAction';

    /**
     * the filter collection
     */
    public filterChain: FilterChain;

    constructor() {
        super();

        this.filterChain = FilterFactory.createFilterChain(this);
    }

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
    public filters(): IFilter[] | null {
        return null;
    }

    /**
     * Then entry of the controller
     */
    public async runControllerAction(request: HttpRequest): Promise<HttpResponse> {
        const actionEvent = new ActionEvent();
        actionEvent.request = request;

        this.beforeAction(actionEvent);
        if (false === actionEvent.valid && null !== actionEvent.response) {
            return actionEvent.response;
        }

        const res = await this.filterChain.doFilter(request);
        actionEvent.response = res;
        this.afterAction(actionEvent);

        return res;
    }

    /**
     * @inheritdoc
     */
    public abstract render<T>(view: string, parameters: JSONCompatible<T> | null): Promise<string>;

    /**
     * @inheritdoc
     */
    public abstract run(request: HttpRequest): Promise<HttpResponse>;
}
