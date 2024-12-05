/**
 * @author afu
 * @license MIT
 */
import type IResource from './IResource.ts';
import FilterChain from './FilterChain.ts';

/**
 * Factory of filter chain
 */
export default class FilterFactory {
    private constructor() {}

    /**
     * Create a filter chain
     *
     * @param {IResource} resource The resource
     * @returns {FilterChain}
     */
    public static createFilterChain(resource: IResource): FilterChain {
        const filterChain = new FilterChain();
        filterChain.setResource(resource);

        const filters = resource.filters();
        if (null === filters) {
            return filterChain;
        }

        for (const filter of filters) {
            filterChain.addFilter(filter);
        }

        return filterChain;
    }
}
