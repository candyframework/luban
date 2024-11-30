/**
 * @author afu
 * @license MIT
 */

/**
 * Exception interface
 */
export default interface IException {
  /**
   * 获得错误名
   *
   * @return {string} 异常类名称
   */
  getName(): string;
}
