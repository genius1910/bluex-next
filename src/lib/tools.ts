// times :: Int -> (void -> void) -> void
export const times = (x: number) => (f: () => void) => {
  if (x > 0) {
    f()               // has to be side-effecting function
    times (x - 1) (f)
  }
}

export function range(stop: number, start: number = 1, step: number = 1) {
	return Array.from(
		{ length: (stop - start) / step + 1 },
		(_, i) => start + i * step
	);
}

export function reverseRecord<
  T extends PropertyKey,
  U extends PropertyKey,
>(input: Record<T, U>) {
  return Object.fromEntries(
    Object.entries(input).map(([key, value]) => [
      value,
      key,
    ]),
  ) as Record<U, T>
}

export function combineURLs(baseURL: string, relativeURL?: string, params?: string): string {
  let url = relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;

  if (params) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + params;
  }

  return url
}
