'use client';

import { useAppSelector } from '@/utils/redux/store';
import CardSong from "../cards/cardSong";

const PlayerCurrPlaying = () => {
  let currImage, currName, currArtists, albumUri = null;
  const current = useAppSelector(state => state.playback);
  const { currentPlayback } = current;
  
  if (currentPlayback !== null) {
    const { album, name, artists } = currentPlayback;
    const { images } = album ?? null;

    currName = name;
    currImage = images[0].url;
    currArtists = artists.map(item => {
      return {
        id: item.id,
        name: item.name,
      }
    });
    albumUri = album.uri ?? '';
  }

  return (
    <>
      { (currentPlayback) && <CardSong image={currImage} name={currName} artists={currArtists} albumUri={albumUri} />}
    </>
  )
}

export default PlayerCurrPlaying;