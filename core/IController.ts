/**
 * @author afu
 * @license MIT
 */
import type IResource from './IResource.ts';
import type ActionEvent from './ActionEvent.ts';

export default interface IController extends IResource {
  /**
   * 控制器方法执行前
   *
   * @param {ActionEvent} actionEvent
   */
  beforeAction(actionEvent: ActionEvent): void;

  /**
   * 控制器方法执行后
   *
   * @param {ActionEvent} actionEvent
   */
  afterAction(actionEvent: ActionEvent): void;

  /**
   * 渲染视图
   *
   * @param {string} view 视图名
   * @param {unknown} parameters 参数
   */
  render(view: string, parameters?: unknown): string;
}
