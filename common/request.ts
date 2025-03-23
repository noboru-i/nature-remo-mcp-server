import { getUserAgent } from "universal-user-agent";
import { VERSION } from "./version.js";

type RequestOptions = {
    method?: string;
    body?: unknown;
    headers?: Record<string, string>;
}

async function parseResponseBody(response: Response): Promise<unknown> {
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        return response.json();
    }
    return response.text();
}

export function buildUrl(baseUrl: string, params: Record<string, string | number | undefined>): string {
    const url = new URL(baseUrl);
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
            url.searchParams.append(key, value.toString());
        }
    });
    return url.toString();
}

const USER_AGENT = `noboru-i/nature-remo-mcp-server/v${VERSION} ${getUserAgent()}`;

export async function natureRemoRequest(
    url: string,
    options: RequestOptions = {}
): Promise<unknown> {
    const headers: Record<string, string> = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": USER_AGENT,
        ...options.headers,
    };

    if (process.env.ACCESS_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.ACCESS_TOKEN}`;
    }

    const response = await fetch(url, {
        method: options.method || "GET",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const responseBody = await parseResponseBody(response);

    if (!response.ok) {
        // throw createGitHubError(response.status, responseBody);
        throw response;
    }

    return responseBody;
}
