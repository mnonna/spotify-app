import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req, res) {
  const request = await req.json();
  const { state } = request;

  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  if (state === null || state === 'undefined')
    return NextResponse.json({ error: 'Please provide state' }, { status: 500 })

  try {
    let fetchRequest = null;

    if (state === true) {
      fetchRequest = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/player/pause`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
      });
    } else {
      fetchRequest = await fetch(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/player/play`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${token.value}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
      });      
    }

    if (!fetchRequest.ok) {
      const errorResponse = await fetchRequest.json();
      throw new Error(`Error: ${errorResponse.error.message}`);
    }
    
    const res = await fetchRequest.json();
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}