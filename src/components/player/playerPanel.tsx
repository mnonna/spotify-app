'use client';
import { useState, useEffect, memo } from 'react';
import '@/scss/player/playerWrapper.scss';
import PlayerCurrPlaying from '@/components/player/playerCurrPlaying';
import Player from '@/components/player/player';
import { subscribe, unsubscribe } from '@/utils/events/events';

const PlayerPanel = () => {
  const [current, setCurrent] = useState(null);
  const [hasInit, setHasInit] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const urlParams = new URLSearchParams({
    'action': 'current'
  }).toString();

  const fetchCurrent = () => {
    fetch(`/api/player?${urlParams}`).then(res => res.json()).then((data) => {
      const { item, progress_ms, is_playing } = data;

      setCurrent(item);
      setProgress(progress_ms);
      setIsPlaying(is_playing);
      setHasInit(true);
    });
  }

  const checkPlayerState = (event) => {
    console.log('player change');
    
    setHasInit(false);
  }

  useEffect(() => {
    subscribe('playerStateChange', (event) => checkPlayerState(event));

    const intervalId = setInterval(() => {
      if (isPlaying || !hasInit) {
        fetchCurrent();
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
      unsubscribe('playerStateChange', checkPlayerState);
    }
  }, [current, hasInit, progress, isPlaying])

  let currPlaying = {
    name: '',
    image: '',
    artists: [],
  }

  let playbackData = {
    progress_ms: 0,
    duration_ms: 0,
    is_playing: false
  }

  if (current) {
    const { album, name, artists } = current;
    const { images } = album ?? null;
    const albumImage = images[0].url;
    const artistsDetails = artists.map(item => {
      return {
        id: item.id,
        name: item.name,
      }
    })

    currPlaying = {
      name,
      image: albumImage,
      artists: artistsDetails,
    }

    playbackData = {
      progress_ms: progress,
      duration_ms: current.duration_ms,
      is_playing: isPlaying
    }
  }

  return (
    <aside className="playerPanel">
      <div className="playerPanel__wrapper grid grid-cols-7 gap-2">
        <div className="playerPanel__current">
          <PlayerCurrPlaying {...currPlaying} />
        </div>
        <div className="playerPanel__player">
          <Player {...playbackData} />
        </div>
        <div className="playerPanel__actions"></div>
      </div>
    </aside>
  )
};

export default PlayerPanel;