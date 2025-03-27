import type { Maybe, Optional } from './types.js';

export function getHost(url?: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).host;
	} catch {
		return undefined;
	}
}

export function getOrigin(url?: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).origin;
	} catch {
		return undefined;
	}
}

export function getPathname(url?: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).pathname;
	} catch {
		return undefined;
	}
}

export function getHostname(url?: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		return new URL(url).hostname;
	} catch {
		return undefined;
	}
}

export function getSearchParams(
	url?: Maybe<string>,
): Optional<URLSearchParams> {
	if (!url) return undefined;

	try {
		return new URL(url).searchParams;
	} catch {
		return undefined;
	}
}

export function getTopLevelDomain(url?: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		const parts = new URL(url).hostname.split('.');
		return parts.at(-1);
	} catch {
		return undefined;
	}
}

export function getSecondLevelDomain(url?: Maybe<string>): Optional<string> {
	if (!url) return undefined;

	try {
		const parts = new URL(url).hostname.split('.');
		return parts.at(-2);
	} catch {
		return undefined;
	}
}

export function getSubdomainSegments(url?: Maybe<string>): Optional<string[]> {
	if (!url) return undefined;

	try {
		const parts = new URL(url).hostname.split('.');
		return parts.slice(0, -1);
	} catch {
		return undefined;
	}
}
