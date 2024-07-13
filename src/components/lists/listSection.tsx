import FollowingList from "@/components/lists/followingList";
import SuggestedTracksList from "@/components/lists/suggestedTracks";
import CategoriesList from "@/components/lists/categoriesList";
import SavedTracksList from "@/components/lists/savedTracksList";
import loadListData from "@/utils/lists/loadListData";

import '@/scss/lists/listSection.scss';

export default async function ListSection({ listType }) {
  const data = await loadListData(listType);
  const isError = (data.length === 0 || data.error?.length !== 0);

  return (
    <>
      {((data && !isError) && listType === 'following') &&
        <FollowingList data={data} />
      }
      {((data && !isError) && listType === 'featured-playlists') &&
        <SuggestedTracksList data={data} />
      }
      {((data && !isError) && listType === 'browse-categories') &&
        <CategoriesList data={data} />
      }
      {((data && !isError) && listType === 'saved-tracks') &&
        <SavedTracksList data={data} />
      }
    </>
  )
}