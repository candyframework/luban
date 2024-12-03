/**
 * @author afu
 * @license MIT
 */
import type IEvent from './IEvent.ts';
import LinkedList from '../utils/LinkedList.ts';

/**
 * Simple Event
 */
export default class Event implements IEvent {
    public eventsMap: Map<string, LinkedList<any>> = new Map();

    constructor() {}

    /**
     * @inheritdoc
     */
    public on(eventName: string, handler: any): void {
        let list = this.eventsMap.get(eventName);

        if (undefined === list) {
            list = new LinkedList();
            list.add(handler);
            this.eventsMap.set(eventName, list);
            return;
        }

        list.add(handler);
    }

    /**
     * @inheritdoc
     */
    public off(eventName: string, handler: any = null): void {
        const list = this.eventsMap.get(eventName);
        if (undefined === list) {
            return;
        }

        if (null === handler) {
            this.eventsMap.delete(eventName);
            return;
        }

        list.remove(handler);
    }

    /**
     * @inheritdoc
     */
    public offAll(): void {
        this.eventsMap.clear();
    }

    /**
     * @inheritdoc
     */
    public trigger(eventName: string, parameter: any = null): void {
        const list = this.eventsMap.get(eventName);

        if (undefined === list) {
            return;
        }

        for (const h of list) {
            h(parameter);
        }
    }
}
