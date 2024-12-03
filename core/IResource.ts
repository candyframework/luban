/**
 * @author afu
 * @license MIT
 */

/**
 * Class implementing this interface is called a resource class
 */
export default interface IResource {
    /**
     * Declare resource filters
     */
    filters(): string[] | null;

    /**
     * Run the resource
     */
    run(request: Request): Promise<Response>;
}
