/**
 * @author afu
 * @license MIT
 */
import type IBehavior from './IBehavior.ts';
import Event from './Event.ts';

/**
 * The base class that implements behaviors and events
 */
export default class Component extends Event {
    /**
     * the attached behaviors
     */
    public behaviorsMap: Map<string, IBehavior> = new Map();

    constructor() {
        super();
        this.attachDeclaredBehaviors();
    }

    /**
     * Get the component name
     */
    public className(): string {
        return this.constructor.name;
    }

    /**
     * Declare behavior list
     *
     * ```typescript
     * [
     *      ['behaviorName1', new BehaviorClass1()],
     * ]
     * ```
     */
    public behaviors(): [string, IBehavior][] | null {
        return null;
    }

    /**
     * Attach a behavior to the component
     */
    public attachBehavior(name: string, behavior: IBehavior): void {
        this.attachBehaviorInternal(name, behavior);
    }

    /**
     * Detach a behavior from the component
     */
    public detachBehavior(name: string): IBehavior | null {
        return this.detachBehaviorInternal(name);
    }

    /**
     * Ensure that the declared behaviors are attached to the component
     */
    private attachDeclaredBehaviors(): void {
        const behaviors = this.behaviors();
        if (null === behaviors) {
            return;
        }

        for (const v of behaviors) {
            this.attachBehaviorInternal(v[0], v[1]);
        }
    }

    private attachBehaviorInternal(name: string, behavior: IBehavior): void {
        if (this.behaviorsMap.has(name)) {
            this.detachBehaviorInternal(name);
        }

        const events = behavior.events();
        if (null !== events) {
            for (const v of events) {
                this.on(v[0], v[1]);
            }
        }
        this.behaviorsMap.set(name, behavior);
    }

    private detachBehaviorInternal(name: string): IBehavior | null {
        const behavior = this.behaviorsMap.get(name);
        if (undefined === behavior) {
            return null;
        }

        this.behaviorsMap.delete(name);

        const events = behavior.events();
        if (null !== events) {
            for (const v of events) {
                this.off(v[0], v[1]);
            }
        }

        return behavior;
    }
}
