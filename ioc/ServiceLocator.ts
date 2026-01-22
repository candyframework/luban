/**
 * @author afu
 * @license MIT
 */
import LuBan from '../LuBan.ts';

/**
 * [Service Locator](//en.wikipedia.org/wiki/Service_locator_pattern)
 *
 * ```typescript
 * const serviceLocator = new ServiceLocator();
 * serviceLocator.setServicesAsDefinition({
 *     service1: {
 *         "classType": SomeService,
 *         "property1": value1,
 *         "property2": value2
 *     }
 * });
 *
 * const instanceService1 = serviceLocator.getService('service1');
 * ```
 */
export default class ServiceLocator<T> {
    /**
     * Service instances
     */
    public cache: Map<string, T> = new Map();

    /**
     * Service definitions
     */
    public definitions: Map<string, { classType: new () => T; [key: string]: unknown }> = new Map();

    /**
     * Set a service
     *
     * @param {string} name The name of the service
     * @param {T} service The service instance
     */
    public setService(name: string, service: T): void {
        this.cache.set(name, service);
    }

    /**
     * Set a serivce as definition
     */
    public setServicesAsDefinition(definition: Record<string, { classType: new () => T; [key: string]: unknown }>): void {
        for (const key in definition) {
            this.definitions.set(key, definition[key]);
        }
    }

    /**
     * Check if the service exists
     */
    public hasService(key: string): boolean {
        return this.cache.has(key) || this.definitions.has(key);
    }

    /**
     * Get a service
     */
    public getService(name: string): T | null {
        let service = this.cache.get(name);
        if (undefined !== service) {
            return service;
        }

        const definition = this.definitions.get(name);
        if (undefined !== definition) {
            service = LuBan.createObject(definition) as T;
            this.cache.set(name, service);
            return service;
        }

        return null;
    }

    /**
     * Clear services
     */
    public clear(): void {
        this.cache.clear();
        this.definitions.clear();
    }
}
