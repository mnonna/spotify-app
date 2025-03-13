import { Suspense } from "react";
import ArtistsList from "@/components/lists/artistsList";
import AlbumsList from "@/components/lists/albumsList";
import ListSectionSkeleton from "@/components/skeletons/listSectionSkeleton";
import fetchFromSpotify from "@/utils/fetch";

export default async function Search({params}) {
  const { phrase } = params;
  const data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/search`, {
    q: phrase,
    type: 'album,artist,playlist,track',
  });

  return (
    <>
        <Suspense fallback={<ListSectionSkeleton itemsCount={7}/>}>
          <AlbumsList data={data.albums} />
        </Suspense> 
        <Suspense fallback={<ListSectionSkeleton itemsCount={7}/>}>
          <ArtistsList data={data.artists} heading="Artists" />
        </Suspense> 
        <Suspense fallback={<ListSectionSkeleton itemsCount={7}/>}>
          <ArtistsList data={data.playlists} heading="Playlists" />
        </Suspense> 
    </>
  )
}