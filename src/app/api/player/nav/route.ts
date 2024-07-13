import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req, res) {
  const request = await req.json();
  const { action } = request;

  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  if (action === null || typeof action === 'undefined')
    return NextResponse.json({ error: 'Please provide action (prev or next)' }, { status: 500 })

  try {
    let request = await fetch(`${process.env.SPOTIFY_BASE_API_URL}/me/player/${action}`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token.value}`
      },
    });

    const res = await request.json();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}