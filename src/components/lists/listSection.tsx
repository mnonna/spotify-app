import ArtistsList from "./artistsList";
import AlbumsList from "./albumsList";
import SavedPlaylistsSlider from "@/components/lists/savedPlaylistsSlider";
import CategoriesList from "@/components/lists/categoriesList";
import SavedTracksList from "@/components/lists/savedTracksList";
import loadListData from "@/utils/lists/loadListData";

export default async function ListSection({ listType, params = null }) {
  const dataProm = new Promise((resolve) => {
    setTimeout(async () => {
      resolve(await loadListData(listType, params));
    }, 2000)
  });

  let data = null;
  await dataProm.then((res) => {
    data = res;
  });
  
  const isError = (data.length === 0 || data.error);

  if (data === null || data === undefined) return null;

  return (
    <>
      {((data && !isError) && listType === 'artists') &&
        <ArtistsList data={data} />
      }
      {((data && !isError) && listType === 'following') &&
        <ArtistsList data={data.artists} heading="Followed artists" />
      }
      {((data && !isError) && listType === 'featured-playlists') &&
        <SavedPlaylistsSlider data={data} />
      }
      {((data && !isError) && listType === 'browse-categories') &&
        <CategoriesList data={data} />
      }
      {((data && !isError) && listType === 'saved-tracks') &&
        <SavedTracksList data={data} />
      }
      {((data && !isError) && listType === 'album') &&
        <AlbumsList data={data} heading={params.heading ?? 'Discography'}/>
      }
    </>
  )
}