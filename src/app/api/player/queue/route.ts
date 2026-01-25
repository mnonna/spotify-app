import fetchFromSpotify from '@/utils/fetch';

export async function GET(req: Request) {
  try {
    const data = await fetchFromSpotify('https://api.spotify.com/v1/me/player/queue', {});
    return new Response(JSON.stringify({ queue: data.queue }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}