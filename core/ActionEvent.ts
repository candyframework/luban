/**
 * @author afu
 * @license MIT
 */

/**
 * 控制器动作事件
 */
export default class ActionEvent {
  /**
   * http request
   */
  public request: Request | null = null;

  /**
   * 数据
   */
  public data: unknown = null;

  /**
   * 是否继续执行后续程序
   */
  public valid: boolean = true;
}
