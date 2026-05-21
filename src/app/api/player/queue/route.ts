import fetchFromSpotify from '@/utils/fetch';

export async function GET(req: Request) {
  try {
    const data = await fetchFromSpotify('https://api.spotify.com/v1/me/player/queue', {});

    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message ?? 'Failed to fetch queue' }), {
        status: data.error.status ?? 500,
      });
    }

    return new Response(JSON.stringify({ queue: data.queue ?? [] }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}