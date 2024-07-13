import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function PUT(req, res) {
  const request = await req.json();
  const body = request;

  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  if (body === null || typeof body === 'undefined')
    return NextResponse.json({ error: 'Please provide context' }, { status: 500 })

  try {
    const request = await fetch(`${process.env.SPOTIFY_BASE_API_URL}/me/player/play`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${token.value}`
      },
      body: JSON.stringify(body)
    }); 

    const res = await request.json();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}