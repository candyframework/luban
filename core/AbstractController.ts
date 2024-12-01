import type ActionEvent from './ActionEvent.ts';
import type IClass from './IClass.ts';
import type IController from './IController.ts';

/**
 * @author afu
 * @license MIT
 */
export default abstract class AbstractController implements IController {
  /**
   * @inheritdoc
   */
  public beforeAction(actionEvent: ActionEvent): void {
    throw new Error('Method not implemented.');
  }

  /**
   * @inheritdoc
   */
  public afterAction(actionEvent: ActionEvent): void {
    throw new Error('Method not implemented.');
  }

  /**
   * @inheritdoc
   */
  public filters(): IClass[] | null {
    return null;
  }

  /**
   * @inheritdoc
   */
  public abstract render(view: string, parameters?: unknown): string;

  /**
   * @inheritdoc
   */
  public abstract run(request: Request): Promise<Response>;
}
