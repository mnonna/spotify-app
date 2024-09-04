import { publish } from '@/utils/events/events';
import { msToTime } from '@/utils/math';
import AppButton from '@/components/button/AppButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { iCardPlaylistProps } from '@/interface/cardPlaylistSong';
import '@/scss/cards/cardPlaylistSong.scss';

export default function CardPlaylistSong(data: iCardPlaylistProps) {
  if (!data) return null;

  const { name, album, artists, duration_ms, uri, playlist_uri, offset, list_index } = data;
  let is_playing = false;

  let image = '';
  if (album?.images.length > 0) image = album.images[0].url;

  const artistsText = artists.map(item => item.name).join(', ');
  const durationStr = msToTime(duration_ms);

  const togglePlay = async () => {
    const request = await fetch(`/api/player/playback`, {
      method: 'POST',
      body: JSON.stringify({
        state: false,
        context_uri: `spotify:playlist:${playlist_uri}`,
        offset: {
            position: offset
        },
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  return (
    <div className="cardPlaylistSong">
      <div className="cardPlaylistSong__col text-sm">
        <div className="cardPlaylistSong__toggle">
          <AppButton classNames={`-with-icon -round`} onClickEvent={() => togglePlay()}>
            {!is_playing && (
              <PlayArrowIcon />
            )}
            {is_playing && (
              <PauseIcon />
            )}
          </AppButton>
        </div>
        <div className="cardPlaylistSong__index">{list_index}</div>
      </div>
      <div className="cardPlaylistSong__col cardPlaylistSong__col--data">
        <p className='text-sm font-medium'>{name}</p>
        <p className='text-xs'>{artistsText}</p>
      </div>
      <div className="cardPlaylistSong__col text-sm">{durationStr}</div>
    </div>
  )
}