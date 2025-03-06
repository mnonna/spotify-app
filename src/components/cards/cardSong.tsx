'use client';
import Image from 'next/image'
import Link from 'next/link';
import '@/scss/cards/cardSong.scss';
import { iCardSongProps } from '@/interface/cardSong';
import Placeholder from '../../../public/placeholder.svg';

export default function CardSong(props: iCardSongProps) {
  const { image, name, artists, uri } = props;
  let href = '';

  if ((uri && uri.length > 0)) {
    const uriSplit = uri.split(':');
    const type = uriSplit[1];
    const id = uriSplit[2];
    href = `/dashboard/playlist/${type}/${id}`;
  }

  return (
    <div className="cardSong">
      {(href !== '') ? 
        <div className="cardSong__link absolute top-0 left-0 w-full h-full">
          <Link href={href}></Link>
        </div>
      : null}

      {image !== '' ? (
        <div className="cardSong__cover">
          <Image 
              src={image}
              width={300}
              height={300}
              alt={`Album image`}
              priority={true}
            />
        </div>
      ) : 
      <div className="cardSong__cover">
          <Image 
              src={Placeholder}
              width={300}
              height={300}
              alt={`Album placeholder`}
              priority={true}
            />
        </div>
      }
      <div className="cardSong__data">
        <div className="cardSong__name text-sm font-bold">{ name }</div>
        <div className="cardSong__artists">
          {
            artists.map((item, index) => {
              return (
                <div key={index} className='cardSong__artist text-xs'>{ `${item.name}${(index !== artists.length - 1) ? ',' : ''}`}</div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}