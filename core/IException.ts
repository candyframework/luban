/**
 * @author afu
 * @license MIT
 */

/**
 * Exception interface
 */
export default interface IException {
    /**
     * Exception message
     */
    message: string;

    /**
     * Get the name of the exception
     *
     * @return {string} Name of the exception
     */
    getName(): string;
}
