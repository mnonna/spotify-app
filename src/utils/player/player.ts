import fetchFromSpotify from '@/utils/fetch';

const setCurrentTrack = async () => {
  const data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/player/currently-playing`, {});
  return data;
}

export default setCurrentTrack;