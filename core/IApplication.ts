/**
 * @author afu
 * @license MIT
 */
import type IException from './IException.ts';

/**
 * Application interface
 */
export default interface IApplication {
  /**
   * 编码
   */
  encoding: string;

  /**
   * 调试开关
   */
  debug: boolean;

  /**
   * 异常处理类
   */
  exceptionHandler: string;

  /**
   * 设置应用路径
   *
   * @param {string} path 应用路径
   */
  setAppPath(path: string): void;

  /**
   * 得到应用目录
   *
   * @return {string} 路径
   */
  getAppPath(): string;

  /**
   * 设置 runtime 路径
   *
   * @param {string} path 路径
   */
  setRuntimePath(path: string): void;

  /**
   * 得到 runtime 目录
   *
   * @return {string} 路径
   */
  getRuntimePath(): string;

  /**
   * 处理请求
   *
   * @param {Request} request http request
   */
  requestListener(request: Request): Promise<Response>;

  /**
   * 异常处理
   *
   * @param {Request} exception 异常类
   */
  handlerException(exception: IException, request: Request): Response;
}
