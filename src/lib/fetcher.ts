type Method = "GET" | "POST" | "PUT" | "DELETE";

interface FetcherOptions {
  method?: Method;
  headers?: HeadersInit;
  body?: Record<string, unknown>;
  queryParams?: Record<string, string | number>;
}

export async function fetcher<T = unknown>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { method = "GET", headers, body, queryParams } = options;

  const url = new URL(endpoint);

  // Append query params if any
  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }
  const res = await fetch(url.toString(), {
    method,
    headers: {
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || res.statusText);
  }

  return res.json() as Promise<T>;
}
