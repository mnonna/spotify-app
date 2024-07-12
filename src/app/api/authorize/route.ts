import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const request = await req.json();
  const { clientID, clientSecret } = request;

  if ((!clientID || !clientSecret ) || (clientID === '' || clientSecret === ''))
    return NextResponse.json({ error: 'Please enter valid ID and Secret' }, { status: 500 })

  try {
    const scope = `user-read-private user-read-email user-top-read user-follow-read 
      user-library-read playlist-read-private user-read-playback-state user-modify-playback-state user-read-currently-playing`;
    const authorizeURL = `https://accounts.spotify.com/authorize?${new URLSearchParams({ response_type: 'code', client_id: clientID, scope: scope, redirect_uri: `http://localhost:3000/login/auth`,})}`

    return NextResponse.json({
      auth_url: authorizeURL
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}