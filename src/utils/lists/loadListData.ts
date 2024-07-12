import fetchFromSpotify from '@/utils/fetch';

const loadListData = async (listType: string) => {
  let data = [];
  if (!listType) return data;

  switch(listType) {
    case 'following':
      data = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/me/following`, {
        type: 'artist'
      });
      break;
    case 'featured-playlists':
      data = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/browse/featured-playlists`, {
        locale: 'en_GB',
        limit: 10
      });
      break;
    case 'browse-categories':
      data = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/browse/categories`, {
        locale: 'pl_PL',
        limit: 10
      });
      break;
    case 'saved-tracks':
      data = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/me/tracks`, {
        market: 'PL'
      });
      break;
    default:
      break;
  }

  return data;
}

export default loadListData;