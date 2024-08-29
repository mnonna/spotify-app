'use client';
import { useState, useEffect } from 'react';
import { publish } from '@/utils/events/events';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import AppButton from '@/components/button/AppButton';
import { getPercentage, msToTime } from '@/utils/math';
import { subscribe, unsubscribe } from '@/utils/events/events';
import { setPlaybackState } from '@/utils/redux/player';
import { useAppDispatch, useAppSelector } from '@/utils/redux/store';
import '@/scss/player/player.scss';

export default function Player() {
  const dispatch = useAppDispatch();
  const currentSong = useAppSelector(state => state.playback);
  const { currentPlayback } = currentSong;
  const currentUri = currentPlayback?.uri;
  const currentDuration = currentPlayback?.duration_ms;

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
      const { uri } = item;

      setCurrent(item);
      setProgress(progress_ms);
      setIsPlaying(is_playing);
      setHasInit(true);

      if (uri !== currentUri) {
        console.log(uri, currentUri);
        dispatch(setPlaybackState(item));
      }
    });
  }

  const checkPlayerState = (event) => {
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

  const progressReadable = msToTime(progress);
  const durationReadable = msToTime(currentDuration);
  const percentage = getPercentage(progress, currentDuration);
  const barStyle = {
    width: `${percentage.toString()}%`,
  }

  const togglePlay = async () => {
    const request = await fetch(`/api/player/playback`, {
      method: 'POST',
      body: JSON.stringify({
        state: isPlaying
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  const togglePrev = async () => {
    const request = await fetch(`/api/player/nav`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'prev'
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  const toggleNext = async () => {
    const request = await fetch(`/api/player/nav`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'next'
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  return (
    <div className="player">
      <div className="player__controls">
        <div className="player__nav -prev">
          <AppButton classNames={`-with-icon -round`} onClickEvent={togglePrev}>
            <SkipPreviousIcon />
          </AppButton>
        </div>
        <div className="player__nav -play">
          <AppButton classNames={`-with-icon -round`} onClickEvent={togglePlay}>
            {!isPlaying && (
              <PlayArrowIcon />
            )}
            {isPlaying && (
              <PauseIcon />
            )}
          </AppButton>
        </div>
        <div className="player__nav -next">
          <AppButton classNames={`-with-icon -round`} onClickEvent={toggleNext}>
            <SkipNextIcon />
          </AppButton>
        </div>
      </div>
      <div className="player__details">
        <div className="player__time text-xs">{progressReadable}</div>
        <div className="player__bar">
          <div className="player__bar-current" style={barStyle}></div>
        </div>
        <div className="player__time text-xs">{durationReadable}</div>
      </div>
    </div>
  )
}