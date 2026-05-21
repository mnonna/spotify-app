import { cookies } from 'next/headers';

export default async function fetchFromSpotify(url, params) {
  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  if (!token?.value) {
    return { error: { status: 401, message: 'No auth token found' } };
  }

  let reqUrl = url;
  const queryParams = new URLSearchParams(params).toString();

  if (queryParams && queryParams.length > 0) reqUrl = `${reqUrl}?${queryParams}`

  const req = await fetch(`${reqUrl}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token.value}`
    },
    cache: 'no-store',
  });

  const res = await req.json();

  if (!req.ok || res.error) {
    return { error: res.error ?? { status: req.status, message: req.statusText } };
  }

  return res;
}
