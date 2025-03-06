import fetchFromSpotify from '@/utils/fetch';

const loadListData = async (listType: string, params: any) => {
  let data = null;
  if (!listType) return data;

  switch(listType) {
    case 'artists':
      data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/top/artists`, {});
      break;
    case 'following':
      data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/following`, {
        type: 'artist'
      });
      break;
    case 'featured-playlists':
      data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/playlists`, {
        locale: 'en_GB',
        limit: 10
      });
      break;
    case 'browse-categories':
      data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/browse/categories`, {
        locale: 'pl_PL',
        limit: 10
      });
      break;
    case 'saved-tracks':
      data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/me/tracks`, {
        market: 'PL'
      });
      break;
    case 'album':
      const { id, include_groups } = params;
      data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/artists/${id}/albums`, {
        include_groups: include_groups
      });
    default:
      break;
  }

  return data;
}

export default loadListData;