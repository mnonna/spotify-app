import FollowingList from "@/components/lists/followingList";
import SuggestedTracksList from "@/components/lists/suggestedTracks";
import CategoriesList from "@/components/lists/categoriesList";
import SavedTracksList from "@/components/lists/savedTracksList";
import loadListData from "@/utils/lists/loadListData";

import '@/scss/lists/listSection.scss';

export default async function ListSection({ listType }) {
  const data = await loadListData(listType);

  return (
    <>
      {(data && listType === 'following') &&
        <FollowingList data={data} />
      }
      {(data && listType === 'featured-playlists') &&
        <SuggestedTracksList data={data} />
      }
      {(data && listType === 'browse-categories') &&
        <CategoriesList data={data} />
      }
      {(data && listType === 'saved-tracks') &&
        <SavedTracksList data={data} />
      }
    </>
  )
}