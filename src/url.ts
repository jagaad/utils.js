import type { Maybe, Optional } from './types.js';

/**
 * Extracts the host from a URL string.
 *
 * ```ts
 * getHost('https://example.com/path?query=123'); // 'example.com'
 * getHost('https://example.com:8080/path?query=123'); // 'example.com:8080'
 * getHost('invalid-url'); // undefined
 * ```
 */
export function getHost(url: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).host;
	} catch {
		return undefined;
	}
}

/**
 * Extracts the origin from a URL string.
 *
 * ```ts
 * getOrigin('https://example.com/path?query=123'); // 'https://example.com'
 * getOrigin('https://example.com:8080/path?query=123'); // 'https://example.com:8080'
 * getOrigin('invalid-url'); // undefined
 * ```
 */
export function getOrigin(url: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).origin;
	} catch {
		return undefined;
	}
}

/**
 * Extracts the pathname from a URL string.
 *
 * ```ts
 * getPathname('https://example.com/path?query=123'); // '/path'
 * getPathname('invalid-url'); // undefined
 * ```
 */
export function getPathname(url: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).pathname;
	} catch {
		return undefined;
	}
}

/**
 * Extracts the hostname from a URL string.
 *
 * ```ts
 * getHostname('https://sub.example.com/path?query=123'); // 'sub.example.com'
 * getHostname('https://sub.example.com:8080/path?query=123'); // 'sub.example.com'
 * getHostname('invalid-url'); // undefined
 * ```
 */
export function getHostname(url: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).hostname;
	} catch {
		return undefined;
	}
}

/**
 * Extracts the search parameters from a URL string as a `URLSearchParams` object.
 *
 * ```ts
 * getSearchParams('https://example.com/path?query=123&foo=bar'); // URLSearchParams { 'query' => '123', 'foo' => 'bar' }
 * getSearchParams('https://example.com/path'); // URLSearchParams {}
 * getSearchParams('invalid-url'); // undefined
 * ```
 */
export function getSearchParams(url: Maybe<string>): Optional<URLSearchParams> {
	if (!url) return undefined;

	try {
		return new URL(url).searchParams;
	} catch {
		return undefined;
	}
}

/**
 * Extracts the top-level domain (TLD) from a URL string.
 *
 * ```ts
 * getTopLevelDomain('https://example.com/path?query=123'); // 'com'
 * getTopLevelDomain('https://sub.example.co.uk/path?query=123'); // 'uk'
 * getTopLevelDomain('invalid-url'); // undefined
 * ```
 */
export function getTopLevelDomain(url: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		const parts = new URL(url).hostname.split('.');
		return parts.at(-1);
	} catch {
		return undefined;
	}
}

/**
 * Extracts the second-level domain (SLD) from a URL string.
 *
 * ```ts
 * getSecondLevelDomain('https://example.com/path?query=123'); // 'example'
 * getSecondLevelDomain('https://sub.example.co.uk/path?query=123'); // 'co'
 * getSecondLevelDomain('invalid-url'); // undefined
 * ```
 */
export function getSecondLevelDomain(url: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		const parts = new URL(url).hostname.split('.');
		return parts.at(-2);
	} catch {
		return undefined;
	}
}

/**
 * Extracts the subdomain segments from a URL string.
 *
 * ```ts
 * getSubdomainSegments('https://sub.example.com/path?query=123'); // ['sub', 'example']
 * getSubdomainSegments('https://example.com/path?query=123'); // ['example']
 * getSubdomainSegments('invalid-url'); // undefined
 * ```
 */
export function getSubdomainSegments(url: Maybe<string>): Optional<string[]> {
	if (!url) return undefined;

	try {
		const parts = new URL(url).hostname.split('.');
		return parts.slice(0, -1);
	} catch {
		return undefined;
	}
}
