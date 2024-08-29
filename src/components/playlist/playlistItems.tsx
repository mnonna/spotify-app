'use client';
import { publish } from '@/utils/events/events';
import { msToTime } from '@/utils/math';
import AppButton from '@/components/button/AppButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import '@/scss/playlist/playlistItems.scss';

export default function PlaylistItems({uri, tracks}) {
  const togglePlay = async (offset) => {
    const request = await fetch(`/api/player/playback`, {
      method: 'POST',
      body: JSON.stringify({
        state: false,
        context_uri: `spotify:playlist:${uri}`,
        offset: {
            position: offset
        },
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  return (
    <section className="playlistItems">
      {tracks.map((item, index) => {
        const { track } = item;
        const { name, album, artists, duration_ms, uri } = track;
        const is_playing = false;

        let image = '';
        if (album.images.length > 0) image = album.images[0].url;

        const artistsText = artists.map(item => item.name).join(', ');
        const durationStr = msToTime(duration_ms);

        return (
          <div key={index} className="playlistItems__item">
            <div className="playlistItems__itemCol text-sm">
              <div className="playlistItems__itemToggle">
              <AppButton classNames={`-with-icon -round`} onClickEvent={() => togglePlay(index)}>
                {!is_playing && (
                  <PlayArrowIcon />
                )}
                {is_playing && (
                  <PauseIcon />
                )}
              </AppButton>
              </div>
              <div className="playlistItems__itemIndex">{ index + 1 }</div>  
            </div>
            <div className="playlistItems__itemCol playlistItems__itemCol--data">
              <p className='text-sm font-medium'>{ name }</p>
              <p className='text-xs'>{ artistsText }</p>
            </div>
            <div className="playlistItems__itemCol text-sm">{ durationStr }</div>
          </div>
        )
      })}
    </section>
  )
}