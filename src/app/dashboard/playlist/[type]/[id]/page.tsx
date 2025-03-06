import { Suspense } from "react";
import fetchFromSpotify from '@/utils/fetch';
import PlaylistHeader from "@/components/playlist/playlistHeader";
import PlaylistItems from "@/components/playlist/playlistItems";

export default async function Playlist({params}) {
  const { id, type } = params;
  
  let tracks, name, description, image, followers, owner = null;
  let apiEndpoint = `${process.env.SPOTIFY_BASE_API_URL}/playlists/${id}`;
  let artistData = null;

  if (type === 'artist') {
    apiEndpoint = `${process.env.SPOTIFY_BASE_API_URL}/artists/${id}/top-tracks`;
    artistData = await fetchFromSpotify(`${process.env.SPOTIFY_BASE_API_URL}/artists/${id}`, {});
  } else if (type === 'album') {
    apiEndpoint = `${process.env.SPOTIFY_BASE_API_URL}/albums/${id}`;
  }

  const data = await fetchFromSpotify(`${apiEndpoint}`, {});

  if (type === 'artist') {
    tracks = data.tracks;
    name = artistData.name;
    description = '';
    followers = artistData.followers.total;
    owner = '';
    if (artistData.images && artistData.images.length > 0) image = artistData?.images[0].url;
  } else if (type === 'playlist') {
    tracks = data.tracks.items;
    name = data.name;
    description = data.description;
    followers = data.followers?.total ?? 0;
    owner = data.owner?.display_name ?? '';
    if (data.images && data.images.length > 0) image = data?.images[0].url;
  } else if (type === 'album') {
    tracks = data.tracks.items;
    name = data.name;
    description = '';
    followers = null;
    owner = data.artists?.name ?? '';
    if (data.images && data.images.length > 0) image = data?.images[0].url;
    if (data.artists) {
      description = data.artists.map(artist => artist.name).join(', ');
    }
  }
  
  return (
    <>
      <Suspense>
        <PlaylistHeader name={name} description={description} image={image} type={type} owner={owner} followersCount={followers} />
        <PlaylistItems uri={id} tracks={tracks} type={type}/>  
      </Suspense>      
    </>
  )
}