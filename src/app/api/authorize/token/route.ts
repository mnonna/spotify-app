import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req, res) {
  const request = await req.json();
  const { code } = request;

  try {
    const envVars = process.env;
    const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = envVars;

    const tokenBody = {
      'code': code,
      'grant_type': 'authorization_code',
      'redirect_uri': 'http://localhost:3000/login/auth'
    }

    const request = await fetch(process.env.SPOTIFY_CLIENT_GRANT_TOKEN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + (new (Buffer as any).from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      body: new URLSearchParams(tokenBody)
    });

    const response = await request.json();
    const { access_token, refresh_token, expires_in, error, error_description } = response;

    if (error) {
      return NextResponse.json({ 
        error: error,
        error_description: error_description, 
      }, { status: 500 })
    }
    
    cookies().set({
      name: "auth-token",
      value: access_token,
      //httpOnly: true,
      sameSite: 'lax',
      path: "/",
      maxAge: expires_in,
      expires: new Date(Date.now() + expires_in),
    });

    cookies().set({
      name: "refresh-token",
      value: refresh_token,
      //httpOnly: true,
      sameSite: 'lax',
      path: "/",
    });
  
    return NextResponse.json({
      message: 'Successfully authorized, redirecting...',
    }, {
      status: 200
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}