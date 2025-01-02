/**
 * @author afu
 * @license MIT
 */
import AbstractRequest from '../core/AbstractRequest.ts';
import CookieCollection from './CookieCollection.ts';
import HeaderCollection from './HeaderCollection.ts';
import ImplementationException from '../core/ImplementationException.ts';

export type ConnectionInfo = {
    encrypted: boolean;
    info: {
        remoteAddr: {
            hostname: string;
            port: number;
        };
    };
};

/**
 * HTTP request
 */
export default class HttpRequest extends AbstractRequest {
    private connectionInfo: ConnectionInfo;

    /**
     * http headers
     */
    private headers: HeaderCollection | null = null;

    /**
     * http cookies
     */
    private cookies: CookieCollection | null = null;

    constructor(request: Request, info: ConnectionInfo) {
        super(request);

        this.connectionInfo = info;
    }

    /**
     * Get request method
     *
     * @returns {string}
     */
    public getRequestMethod(): string {
        return this.request.method.toUpperCase();
    }

    /**
     * Get query string parameter
     *
     * @param {string} parameter Parameter name
     * @param {string} defaultValue Default value
     * @returns {string | null}
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
     * Get post parameter
     *
     * @param {string} parameter Parameter name
     * @param {string} defaultValue Default value
     * @returns {string}
     */
    public getParameter(_parameter: string, _defaultValue: string = ''): string {
        throw new ImplementationException('The method getParameter() is not implemented.');
    }

    /**
     * Returns the headers collection
     *
     * @returns {HeaderCollection}
     */
    public getHeaders(): HeaderCollection {
        if (null === this.headers) {
            this.headers = new HeaderCollection();

            const map = this.request.headers;
            for (const pair of map.entries()) {
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
     * @returns {CookieCollection}
     */
    public getCookies(): CookieCollection {
        if (null === this.cookies) {
            this.cookies = new CookieCollection();

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
     * Get client IP address
     *
     * @returns {string}
     */
    public getClientIp(): string {
        const forward = this.request.headers.get('x-forwarded-for');

        if (null === forward) {
            return this.connectionInfo.info.remoteAddr.hostname;
        }

        return forward.indexOf(',') > 0 ? forward.substring(0, forward.indexOf(',')) : forward;
    }

    /**
     * Get referrer URL
     *
     * @returns {string}
     */
    public getReferrer(): string {
        return this.request.referrer;
    }

    /**
     * Get host info
     *
     * @returns {string}
     */
    public getHostInfo(): string {
        const xfp = this.request.headers.get('x-forwarded-protocol');
        const protocol = this.connectionInfo.encrypted || (null !== xfp && 'https' === xfp) ? 'https' : 'http';

        const host = protocol + '://' + this.request.headers.get('host');
        return host;
    }
}
