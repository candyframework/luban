import type IBehavior from './IBehavior.ts';

/**
 * Behavior base class
 */
export default class Behavior implements IBehavior {
    /**
     * @inheritdoc
     */
    public events(): [string, () => void][] | null {
        return null;
    }
}
