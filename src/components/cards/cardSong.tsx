'use client';
import Image from 'next/image'
import Link from 'next/link';
import '@/scss/cards/cardSong.scss';
import { iCardSongProps } from '@/interface/cardSong';
import Placeholder from '../../../public/placeholder.svg';

export default function CardSong(props: iCardSongProps) {
  const { image, name, artists = [], uri, albumUri } = props;
  const maxArtists = 5;
  const visibleArtists = artists.slice(0, maxArtists);
  const hasMoreArtists = artists.length > maxArtists;
  let href = '';
  let albumHref = '';

  if ((uri && uri.length > 0)) {
    let uriSplit = uri.split(':');
    let type = uriSplit[1];
    let id = uriSplit[2];
    href = `/dashboard/playlist/${type}/${id}`;
  }

  if ((albumUri && albumUri.length > 0)) {
    let uriSplit = albumUri.split(':');
    let id = uriSplit[2];
    albumHref = `/dashboard/playlist/album/${id}`;
  }

  return (
    <div className="cardSong">
      {(href !== '') ?
        <div className="cardSong__link absolute top-0 left-0 w-full h-full">
          <Link href={href}></Link>
        </div>
        : null}

      <div className="cardSong__cover relative">
        {image !== '' ? (
          <Image
            src={image}
            width={300}
            height={300}
            alt={`Album image`}
            priority={true}
          />
        ) :
          <Image
            src={Placeholder}
            width={300}
            height={300}
            alt={`Album placeholder`}
            priority={true}
          />
        }
        {(albumHref !== '') ?
          <div className="cardSong__link absolute top-0 left-0 w-full h-full">
            <Link href={albumHref}></Link>
          </div>
          : null}
      </div>
      <div className="cardSong__data">
        <div className="cardSong__name text-sm font-bold">{name}</div>
        <div className="cardSong__artists">
          {visibleArtists.map((item, index) => {
            const artistHref = `/dashboard/artist/${item.id}`;

            return (
              <div key={item.id ?? index} className="cardSong__artist text-xs">
                <Link href={artistHref}>
                  {`${item.name}${index !== visibleArtists.length - 1 ? ',' : ''}`}
                </Link>
              </div>
            );
          })}
          {hasMoreArtists && (
            <span className="cardSong__artists-more text-xs"> and more...</span>
          )}
        </div>
      </div>
    </div>
  )
}