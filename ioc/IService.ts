/**
 * Service interface
 */
export default interface IService {
    /**
     * Execute the service
     */
    execute(): Promise<void>;
}
