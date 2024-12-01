/**
 * @author afu
 * @license MIT
 */
import type IClass from './IClass.ts';

/**
 * 实现该接口的类称为资源类
 */
export default interface IResource {
  /**
   * 声明资源过滤器
   */
  filters(): IClass[] | null;

  /**
   * 执行
   */
  run(request: Request): Promise<Response>;
}
