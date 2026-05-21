import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/utils/redux/store';
import Link from 'next/link';
import Image from 'next/image';
import AppButton from '../button/AppButton';
import Placeholder from '../../../public/placeholder.svg';
import { fetchQueue } from '@/utils/redux/queue';
import { setPlaybackSnapshot } from '@/utils/redux/player';
import { publish } from '@/utils/events/events';
import "@/scss/cards/cardArtist.scss";

const syncPlaybackSnapshot = async (dispatch: ReturnType<typeof useAppDispatch>) => {
  const response = await fetch('/api/player?action=current');
  const data = await response.json();
  if (data === null || data === undefined) return;

  const { item, is_playing, context } = data;
  dispatch(setPlaybackSnapshot({
    currentPlayback: item ?? null,
    contextUri: context?.uri ?? null,
    isPlaying: is_playing ?? false,
  }));
};

export default function CardArtist(props) {
  const { image, name, uri, id } = props;
  const dispatch = useAppDispatch();
  const { currentPlayback, contextUri, isPlaying } = useAppSelector((state) => state.playback);

  let type = '';
  if (uri && uri.length > 0) {
    const uriSplit = uri.split(':');
    type = uriSplit[1];
  }

  let href = `/dashboard/playlist/${type}/${id}`;
  if (type === 'categories') {
    href = `/dashboard/search/${encodeURIComponent(name)}`;
  } else if (type === 'artist') {
    href = `/dashboard/artist/${id}`;
  }

  const isActive = type === 'track'
    ? currentPlayback?.uri === uri
    : contextUri === uri;

  const muiIcon = useMemo(
    () => (isActive && isPlaying ? 'PauseIcon' : 'PlayArrow'),
    [isActive, isPlaying]
  );

  const handlePlayClick = async () => {
    if (isActive && isPlaying) {
      await fetch('/api/player/playback', {
        method: 'POST',
        body: JSON.stringify({ state: true }),
      });
      publish('playerStateChange');
      await syncPlaybackSnapshot(dispatch);
      return;
    }

    let body = {};

    if (type !== 'track') {
      body = { context_uri: uri };
    } else {
      body = { uris: [uri] };
    }

    await fetch('/api/player/set', {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    publish('playerStateChange');
    await syncPlaybackSnapshot(dispatch);

    setTimeout(() => {
      dispatch(fetchQueue());
    }, 2000);
  };

  const cardClassName = isActive ? 'cardArtist relative -active' : 'cardArtist relative';

  return (
    <>
      <div className={cardClassName}>
        <div className="cardArtist__link absolute top-0 left-0 w-full h-full">
          <Link href={href}></Link>
        </div>
        <div className="cardArtist__top relative">
          <div className="cardArtist__image relative aspect-square mb-4">
            {(image && image !== '') ? (
              <Image
                src={image}
                width={300}
                height={300}
                alt={`Artist image: ${name}`}
                priority={true}
              />
            ) :
              <Image
                src={Placeholder}
                width={300}
                height={300}
                alt={`Artist image placeholder`}
                priority={true}
              />
            }
          </div>
          {uri && uri.length > 0 && href !== '' && (
            <div className="cardArtist__play absolute bottom-2 right-2">
              <AppButton classNames='-with-icon -round -bg-green' onClick={handlePlayClick} muiIcon={muiIcon} />
            </div>
          )}
        </div>
        <div className='cardArtist__name'>
          <p className='text-sm md:text-base font-semibold'>{name}</p>
        </div>
      </div>
    </>
  );
}
