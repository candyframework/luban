/**
 * @author afu
 * @license MIT
 */
import type IFilter from './IFilter.ts';
import type IFilterChain from './IFilterChain.ts';
import type IResource from './IResource.ts';
import type HttpRequest from '../http/HttpRequest.ts';
import type HttpResponse from '../http/HttpResponse.ts';
import ArrayList from '../utils/ArrayList.ts';

/**
 * Filter chain implementation
 *
 * ```
 * -- req --> |         | -- req --> |         | -- req --> |
 *            | filter1 |            | filter2 |            | RESOURCE
 * <-- res -- |         | <-- res -- |         | <-- res -- |
 * ```
 */
export default class FilterChain implements IFilterChain {
    private resource: IResource | null = null;

    /**
     * The current position of the filter chain
     */
    private position: number = 0;

    /**
     * The filter collection
     */
    private filters: ArrayList<IFilter> = new ArrayList<IFilter>(2);

    /**
     * @inheritdoc
     */
    public async doFilter(req: HttpRequest): Promise<HttpResponse> {
        if (this.position >= this.filters.size()) {
            const res = await this.resource!.run(req);
            this.clearFilters();
            return res;
        }

        const filter = this.filters.get(this.position++) as IFilter;
        return filter.doFilter(req, this);
    }

    /**
     * Add a filter to the filter chain
     */
    public addFilter(filter: IFilter): void {
        if (this.filters.contains(filter)) {
            return;
        }

        this.filters.add(filter);
    }

    /**
     * Clear all filters
     */
    public clearFilters(): void {
        this.filters.clear();
        this.position = 0;
        this.resource = null;
    }

    /**
     * Set the resource
     */
    public setResource(resource: IResource): void {
        this.resource = resource;
    }
}
