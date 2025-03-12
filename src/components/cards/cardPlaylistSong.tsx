import { publish } from '@/utils/events/events';
import { msToTime } from '@/utils/math';
import AppButton from '@/components/button/AppButton';
import { iCardPlaylistProps } from '@/interface/cardPlaylistSong';
import { useAppSelector } from '@/utils/redux/store';
import '@/scss/cards/cardPlaylistSong.scss';

export default function CardPlaylistSong(data: iCardPlaylistProps) {
  const currentSong = useAppSelector(state => state.playback);
  if (!data) return null;

  const { name, album, artists, duration_ms, uri, playlist_uri, offset, list_index, type } = data;
  let is_playing = false;

  let image = '';
  if (album?.images.length > 0) image = album.images[0].url;

  const artistsList = artists.map((item, index) => {
    return (index < 3) ? item.name : null;
  }).filter(item => {
    return item !== null;
  });
  let artistsText = artistsList.join(', ');
  if (artists.length > 4) artistsText += ` oraz ${artists.length - 3} więcej...`

  const durationStr = msToTime(duration_ms);
  const { currentPlayback } = currentSong;
  const currentUri = currentPlayback?.uri;
  const active = currentUri === uri;

  const classes = [];
  if (active) classes.push('active');

  const togglePlay = async () => {
    const request = await fetch(`/api/player/playback`, {
      method: 'POST',
      body: JSON.stringify({
        state: false,
        context_uri: `spotify:${type}:${playlist_uri}`,
        offset: {
            uri: uri
        },
        position_ms: 0
      })
    });

    const response = await request.json();
    publish('playerStateChange');
  }

  const iconPlayState = (active) ? 'PauseIcon' : 'PlayArrowIcon';

  return (
    <div className={`cardPlaylistSong ${classes.join(' ')}`}>
      <div className="cardPlaylistSong__col text-sm">
        <div className="cardPlaylistSong__toggle">
          <AppButton classNames={`-with-icon -round`} onClick={() => togglePlay()} muiIcon={iconPlayState} />
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