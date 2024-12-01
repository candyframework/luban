/**
 * @author afu
 * @license MIT
 */

/**
 * server request
 */
export default abstract class AbstractRequest {
  public request: Request;
  private scriptFile: string = '';

  constructor(request: Request) {
    this.request = request;
  }

  /**
   * 返回入口文件
   *
   * @return {string}
   */
  public getScriptFile(): string {
    if ('' === this.scriptFile) {
      this.scriptFile = import.meta.filename ?? '';
    }

    return this.scriptFile;
  }
}
