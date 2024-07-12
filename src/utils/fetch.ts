import { cookies } from 'next/headers';

export default async function fetchFromSpotify(url, params) {
  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  let reqUrl = url;
  const queryParams = new URLSearchParams(params).toString();

  if (queryParams && queryParams.length > 0) reqUrl = `${reqUrl}?${queryParams}`

  const req = await fetch(`${reqUrl}`, {
    method: 'GET',
    headers: {
      "Authorization": `Bearer ${token.value}`
    },
  });

  const res = await req.json();

  return res;
}