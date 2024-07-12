import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req, res) {
  try {
    cookies().delete('access-token');
    cookies().delete('refresh-token');

    return NextResponse.json({
      message: 'Successfully logout'
    }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}