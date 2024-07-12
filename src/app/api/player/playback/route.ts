import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req, res) {
  const request = await req.json();
  const { state } = request;

  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  if (state === null || typeof state === 'undefined')
    return NextResponse.json({ error: 'Please provide state' }, { status: 500 })

  try {
    let request = null;

    if (state === true) {
      request = await fetch(`${process.env.SPOTIFY_BASE_API_URL}/me/player/pause`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
      });
    } else {
      request = await fetch(`${process.env.SPOTIFY_BASE_API_URL}/me/player/play`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
      });      
    }

    const res = await request.json();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}