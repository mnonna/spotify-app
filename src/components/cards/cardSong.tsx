'use client';
import Image from 'next/image'
import '@/scss/cards/cardSong.scss';
import { iCardSongProps } from '@/interface/cardSong';

export default function CardSong(props: iCardSongProps) {
  const { image, name, artists } = props;
  
  return (
    <div className="cardSong">
      {image !== '' && (
        <div className="cardSong__cover">
          <Image 
              src={image}
              width={300}
              height={300}
              alt={`Album image`}
              priority={true}
            />
        </div>
      )}
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