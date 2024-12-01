/**
 * @author afu
 * @license MIT
 */
import AbstractRequest from '../core/AbstractRequest.ts';
import CookieCollection from './CookieCollection.ts';
import HeaderCollection from './HeaderCollection.ts';

/**
 * @author afu
 * @license MIT
 */
export default class HttpRequest extends AbstractRequest {
  /**
   * http headers
   */
  private headers: HeaderCollection | null = null;

  /**
   * http cookies
   */
  private cookies: CookieCollection | null = null;

  constructor(request: Request) {
    super(request);
  }

  /**
   * 获取 get 参数
   *
   * @param {string} parameter 参数名
   * @param {string} defaultValue 默认值
   * @return {string | null}
   */
  public getQueryString(parameter: string, defaultValue: string | null = null): string | null {
    const params = new URL(this.request.url, this.getHostInfo()).searchParams;
    const value = params.get(parameter);

    if (null === value) {
      return defaultValue;
    }

    return value;
  }

  /**
   * 获取 post 参数
   *
   * @param {string} parameter 参数名
   * @param {string} defaultValue 默认值
   * @return {string}
   */
  public getParameter(parameter: string, defaultValue: string = ''): string {
    throw new Error('not support');
  }

  /**
   * Returns the headers collection
   *
   * @return {HeaderCollection}
   */
  public getHeaders(): HeaderCollection {
    if (null === this.headers) {
      this.headers = new HeaderCollection();

      const map = this.request.headers;
      for (const pair of map.entries()) {
        // ??? 待确认
        // For duplicate cookie headers, the values are joined together with '; '
        // For all other headers, the values are joined together with ', '
        this.headers.set(pair[0], pair[1]);
      }
    }

    return this.headers;
  }

  /**
   * Returns the cookies collection
   *
   * @return {CookieCollection}
   */
  public getCookies(): CookieCollection {
    if (null === this.cookies) {
      this.cookies = new CookieCollection();

      // ??? 待确认
      const cookie = this.request.headers.get('cookie');
      if (null === cookie) {
        return this.cookies;
      }

      const list = cookie.split('; ');
      for (let i = 0, equalIndex = 0; i < list.length; i++) {
        equalIndex = list[i].indexOf('=');

        if (-1 === equalIndex) {
          this.cookies.set(list[i], '');
        } else {
          this.cookies.set(
            list[i].substring(0, equalIndex),
            list[i].substring(equalIndex + 1),
          );
        }
      }
    }

    return this.cookies;
  }

  /**
   * 获取客户端 ip
   *
   * @return {string}
   */
  public getClientIp(): string {
    const forward = this.request.headers.get('x-forwarded-for');

    if (null === forward) {
      return '';
    }

    return forward.indexOf(',') > 0 ? forward.substring(0, forward.indexOf(',')) : forward;
  }

  /**
   * 获取引用网址
   *
   * @return {string}
   */
  public getReferrer(): string {
    return this.request.referrer;
  }

  /**
   * 获取 URI 协议和主机部分
   *
   * @return {string}
   */
  public getHostInfo(): string {
    return '';
  }

  /**
   * 获取当前网址 不包含锚点部分
   *
   * @return {String}
   */
  public getCurrent(): string {
    return this.getHostInfo() + this.request.url;
  }

  /**
   * 创建 URL 对象
   *
   * @return {URL}
   */
  public createURL(): URL {
    return new URL(this.request.url, this.getHostInfo());
  }
}
