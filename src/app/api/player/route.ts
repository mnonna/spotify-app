import { NextRequest, NextResponse } from 'next/server';
import setCurrentTrack from '@/utils/player/player';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  const action = req.nextUrl.searchParams.get("action");
  const cookiesList = cookies();
  const token = cookiesList.get('auth-token');

  if (!action)
    return NextResponse.json({ error: 'Please provide valid action: current, seek, prev, next' }, { status: 500 });
  
  let data = null;

  try {
    switch(action) {
      case 'current':
        data = await setCurrentTrack();
        break;
      default:
        break;
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}