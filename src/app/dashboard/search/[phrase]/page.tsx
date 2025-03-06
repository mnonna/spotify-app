import { Suspense } from "react";
import ArtistsList from "@/components/lists/artistsList";
import AlbumsList from "@/components/lists/albumsList";
import fetchFromSpotify from "@/utils/fetch";

export default async function Search({params}) {
  const { phrase } = params;
  const data = await fetchFromSpotify(`${process.env.NEXT_PUBLIC_SPOTIFY_BASE_API_URL}/search`, {
    q: phrase,
    type: 'album,artist,playlist,track',
  });

  console.log(data);

  return (
    <>
        <Suspense fallback={<div>Loading...</div>}>
          <AlbumsList data={data.albums} />
          <ArtistsList data={data.artists} heading="Artists" />
          <ArtistsList data={data.playlists} heading="Playlists" />
        </Suspense> 
    </>
  )
}