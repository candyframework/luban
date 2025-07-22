/**
 * HTTP cookie
 *
 * name=value; Expires=expires; Path=path; Domain=domain[; secure][; httponly]
 */
export default class Cookie {
    /**
     * cookie name
     */
    public name: string;

    /**
     * cookie value
     */
    public value: string;

    /**
     * cookie expires time in milliseconds
     */
    public expires: number;

    /**
     * cookie path
     */
    public path: string;

    /**
     * cookie domain
     */
    public domain: string;

    /**
     * cookie secure
     */
    public secure: boolean;

    /**
     * cookie httpOnly
     */
    public httpOnly: boolean;

    /**
     * constructor
     *
     * @param {string} name Cookie name
     * @param {string} value Cookie value
     * @param {number} expires Cookie expires time in milliseconds
     * @param {string} path Cookie path
     * @param {string} domain Cookie domain
     * @param {boolean} secure Whether the cookie is secure
     * @param {boolean} httpOnly Whether the cookie is httpOnly
     */
    constructor(
        name: string,
        value: string,
        expires: number = 0,
        path: string = '',
        domain: string = '',
        secure: boolean = false,
        httpOnly: boolean = false,
    ) {
        this.name = name;
        this.value = value;
        this.expires = expires;
        this.path = path;
        this.domain = domain;
        this.secure = secure;
        this.httpOnly = httpOnly;
    }

    /**
     * Format a cookie
     *
     * @returns {string}
     */
    public toString(): string {
        const ret = [this.name + '=' + this.value];

        if (0 !== this.expires) {
            ret.push('Expires=' + new Date(this.expires).toUTCString());
        }
        ret.push('Path=' + this.path);
        if ('' !== this.domain) {
            ret.push('Domain=' + this.domain);
        }
        if (this.secure) {
            ret.push('Secure');
        }
        if (this.httpOnly) {
            ret.push('HttpOnly');
        }

        return ret.join('; ');
    }
}
