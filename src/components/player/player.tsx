'use client';

import { publish } from '@/utils/events/events';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import AppButton from '@/components/button/AppButton';
import '@/scss/player/player.scss';
import { iSongPlaybackProps } from '@/interface/player';
import { getPercentage, msToTime } from '@/utils/math';

export default function Player(props: iSongPlaybackProps) {
  const { progress_ms, duration_ms, is_playing } = props;
  
  const progressReadable = msToTime(progress_ms);
  const durationReadable = msToTime(duration_ms);

  const percentage = getPercentage(progress_ms, duration_ms);
  const barStyle = {
    width: `${percentage.toString()}%`,
  }

  const togglePlay = async () => {
    const request = await fetch(`/api/player/playback`, {
      method: 'POST',
      body: JSON.stringify({
        state: is_playing
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  const togglePrev = async () => {
    const request = await fetch(`/api/player/set-song`, {
      method: 'POST',
      body: JSON.stringify({
        action: 'prev'
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  const toggleNext = async () => {
    const request = await fetch(`/api/player/set-song`, {
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
            {!is_playing && (
              <PlayArrowIcon />
            )}
            {is_playing && (
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
        <div className="player__time text-xs">{ progressReadable }</div>
        <div className="player__bar">
          <div className="player__bar-current" style={barStyle}></div>
        </div>
        <div className="player__time text-xs">{ durationReadable }</div>
      </div>
    </div>
  )
}