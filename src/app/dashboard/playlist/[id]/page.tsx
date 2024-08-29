import { Suspense } from "react";
import fetchFromSpotify from '@/utils/fetch';
import PlaylistHeader from "@/components/playlist/playlistHeader";
import PlaylistItems from "@/components/playlist/playlistItems";

export default async function Playlist({params}) {
  const { id } = params;
  let tracks = null;
  let name = null;
  let description = null;
  let image = null;
  let type = null;

  const data = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/playlists/${id}`, {});
  
  tracks = data.tracks.items;
  name = data.name;
  description = data.description;
  type = data.type;
  
  if (data.images.length > 0) image = data.images[0].url;

  return (
    <>
      <Suspense>
        <PlaylistHeader name={name} description={description} image={image} type={type} />
        <PlaylistItems uri={id} tracks={tracks}/>  
      </Suspense>      
    </>
  )
}