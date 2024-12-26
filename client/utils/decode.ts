// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function decodeToken(token: string): { [key: string]: any } {
  const base64Url = token.split('.')[1]; // Get the payload
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
