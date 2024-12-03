/**
 * @author afu
 * @license MIT
 */
import type IException from './IException.ts';

/**
 * Base Exception
 */
export default abstract class AbstractException extends Error implements IException {
    constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }

    /**
     * @inheritdoc
     */
    public getName(): string {
        return this.name;
    }
}
