import type LinkedList from '../utils/LinkedList.ts';

export default interface IEvent {
    /**
     * The attached event handlers
     */
    eventsMap: Map<string, LinkedList<any>>;

    /**
     * Register a event
     *
     * @param {String} eventName Event name
     * @param {Function} handler Event handler
     */
    on(eventName: string, handler: any): void;

    /**
     * 注销事件
     *
     * @param {String} eventName Event name
     * @param {Function} handler Event handler
     */
    off(eventName: string, handler: any): void;

    /**
     * Remove all event handlers
     */
    offAll(): void;

    /**
     * Trigger an event
     *
     * @param {String} eventName Event name
     * @param {any} parameter Parameter
     */
    trigger(eventName: string, parameter: any): void;
}
