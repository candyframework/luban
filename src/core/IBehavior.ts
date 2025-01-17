/**
 * Behavior interface
 */
export default interface IBehavior {
    /**
     * The events that the behavior listens to
     *
     * ```typescript
     * [
     *      ['eventName1', (e: any) => {}],
     * ]
     * ```
     */
    events(): [string, () => void][] | null;
}
