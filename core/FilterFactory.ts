/**
 * @author afu
 * @license MIT
 */
import type IResource from './IResource.ts';
import type { SubFilter } from './IFilter.ts';
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

        const filters = resource.filters() as (SubFilter[] | null);
        if (null === filters) {
            return filterChain;
        }

        for (const F of filters) {
            filterChain.addFilter(new F());
        }

        return filterChain;
    }
}
