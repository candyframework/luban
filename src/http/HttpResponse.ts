/**
 * @author afu
 * @license MIT
 */
import HttpException from '../core/HttpException.ts';
import { JSONCompatible } from '../core/Json.ts';
import Cookie from './Cookie.ts';

/**
 * HTTP response
 */
export default class HttpResponse {
    /**
     * list of HTTP status codes and the corresponding texts
     */
    static httpStatuses: Record<string, string> = {
        // Informational
        '100': 'Continue',
        '101': 'Switching Protocols',
        '102': 'Processing',
        '118': 'Connection timed out',

        // Success
        '200': 'OK',
        '201': 'Created',
        '202': 'Accepted',
        '203': 'Non-Authoritative',
        '204': 'No Content',
        '205': 'Reset Content',
        '206': 'Partial Content',
        '207': 'Multi-Status',
        '208': 'Already Reported',
        '210': 'Content Different',
        '226': 'IM Used',

        // Redirection
        '300': 'Multiple Choices',
        '301': 'Moved Permanently',
        '302': 'Found',
        '303': 'See Other',
        '304': 'Not Modified',
        '305': 'Use Proxy',
        '306': 'Reserved',
        '307': 'Temporary Redirect',
        '308': 'Permanent Redirect',
        '310': 'Too many Redirect',

        // Client error
        '400': 'Bad Request',
        '401': 'Unauthorized',
        '402': 'Payment Required',
        '403': 'Forbidden',
        '404': 'Not Found',
        '405': 'Method Not Allowed',
        '406': 'Not Acceptable',
        '407': 'Proxy Authentication Required',
        '408': 'Request Time-out',
        '409': 'Conflict',
        '410': 'Gone',
        '411': 'Length Required',
        '412': 'Precondition Failed',
        '413': 'Request Entity Too Large',
        '414': 'Request-URI Too Long',
        '415': 'Unsupported Media Type',
        '416': 'Requested range unsatisfiable',
        '417': 'Expectation failed',
        '418': "I'm a teapot",
        '422': 'Unprocessable entity',
        '423': 'Locked',
        '424': 'Method failure',
        '425': 'Unordered Collection',
        '426': 'Upgrade Required',
        '428': 'Precondition Required',
        '429': 'Too Many Requests',
        '431': 'Request Header Fields Too Large',
        '449': 'Retry With',
        '450': 'Blocked by Windows Parental Controls',

        // Server error
        '500': 'Internal Server Error',
        '501': 'Not Implemented',
        '502': 'Bad Gateway or Proxy Error',
        '503': 'Service Unavailable',
        '504': 'Gateway Time-out',
        '505': 'HTTP Version not supported',
        '507': 'Insufficient storage',
        '508': 'Loop Detected',
        '509': 'Bandwidth Limit Exceeded',
        '510': 'Not Extended',
        '511': 'Network Authentication Required',
    };

    /**
     * the HTTP status code
     */
    public statusCode: number = 200;

    /**
     * the HTTP status description that comes together with the status code
     */
    public statusText: string = 'OK';

    /**
     * HTTP headers
     */
    public headers: Headers = new Headers();

    /**
     * HTTP content
     */
    public content: string = '';

    constructor() {}

    /**
     * Get http status code
     *
     * @returns {number}
     */
    public getStatusCode(): number {
        return this.statusCode;
    }

    /**
     * Set http status code
     *
     * @param {number} value the status code
     * @param {string} text the status text
     */
    public setStatusCode(value: number, text: string = ''): HttpResponse {
        if (value < 100 || value >= 600) {
            throw new HttpException('HTTP status code is invalid.');
        }

        this.statusCode = value;

        if ('' === text) {
            this.statusText = undefined !== HttpResponse.httpStatuses[String(value)]
                ? HttpResponse.httpStatuses[String(value)]
                : '';
        } else {
            this.statusText = text;
        }

        return this;
    }

    /**
     * Get header by name
     *
     * @param {string} name the name of the header
     * @returns {string | null}
     */
    public getHeader(name: string): string | null {
        return this.headers.get(name);
    }

    /**
     * Set header
     *
     * @param {string} name the name of the header
     * @param {string} value the value of the header
     */
    public setHeader(name: string, value: string): HttpResponse {
        this.headers.set(name, value);

        return this;
    }

    /**
     * Get content
     *
     * @returns {string}
     */
    public getContent(): string {
        return this.content;
    }

    /**
     * Set content
     *
     * @param {string} content 实体内容
     */
    public setContent(content: string): HttpResponse {
        this.content = content;

        return this;
    }

    /**
     * Set a cookie
     */
    public setCookie(
        name: string,
        value: string,
        expires: number = 0,
        path: string = '',
        domain: string = '',
        secure: boolean = false,
        httpOnly: boolean = false,
    ): HttpResponse {
        const cookie = new Cookie(
            name,
            value,
            expires,
            path,
            domain,
            secure,
            httpOnly,
        );

        this.headers.append('Set-Cookie', cookie.toString());

        return this;
    }

    /**
     * Convert to native response
     */
    public toResponse(): Response {
        const res = new Response(this.content, {
            status: this.statusCode,
            statusText: this.statusText,
            headers: this.headers,
        });

        return res;
    }

    /**
     * Redirect to a URL
     *
     * @param {string} url The URL to redirect to
     * @param {number} statusCode The status code for redirection
     */
    public static redirect(url: string, statusCode: number = 302): Response {
        return Response.redirect(url, statusCode);
    }

    /**
     * Generate a JSON response
     *
     * @param {any} content Content to response
     */
    public static fromJson<T>(content: JSONCompatible<T>): Response {
        const body = JSON.stringify(content);

        return new Response(body, {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Generate a plain response
     *
     * @param {string} content Content to response
     */
    public static fromText(content: string): Response {
        return new Response(content, {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    }

    /**
     * Generate a plain response
     *
     * @param {string} content Content to response
     */
    public static fromHTML(content: string): Response {
        return new Response(content, {
            status: 200,
            statusText: 'OK',
            headers: {
                'Content-Type': 'text/html',
            },
        });
    }
}
