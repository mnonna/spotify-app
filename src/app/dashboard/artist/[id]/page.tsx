import { Suspense } from "react";
import fetchFromSpotify from "@/utils/fetch";
import PlaylistHeader from "@/components/playlist/playlistHeader";
import ListSection from "@/components/lists/listSection";
import ListSectionSkeleton from "@/components/skeletons/listSectionSkeleton";
import PlaylistHeaderSkeleton from "@/components/skeletons/playlistHeaderSkeleton";

export default async function Artist({params}) {
  const { id } = params;
  const albumParams = {...params};
  const albumFeaturedParams = {...params};
  albumParams.include_groups = 'album';
  albumParams.heading = 'Discography';

  albumFeaturedParams.include_groups = 'appears_on';
  albumFeaturedParams.heading = 'Appears On';

  const artistData = await fetchFromSpotify(`https://api.spotify.com/v1/artists/${id}`, {});
  const playlistHeaderData = {
    name: artistData.name,
    description: artistData.genres.join(', '),
    image: artistData.images[0].url,
    type: artistData.type,
    owner: artistData.name,
    followersCount: artistData.followers.total,
    full: true
  }

  return (
    <>
      <Suspense fallback={<PlaylistHeaderSkeleton full />}>
        <PlaylistHeader {...playlistHeaderData}></PlaylistHeader>
      </Suspense>
      <Suspense fallback={<ListSectionSkeleton itemsCount={7} />}>
        <ListSection listType={'album'} params={albumParams}></ListSection>
      </Suspense>
      <Suspense fallback={<ListSectionSkeleton itemsCount={7} />}>
        <ListSection listType={'album'} params={albumFeaturedParams}></ListSection>
      </Suspense> 
    </>
  )
}