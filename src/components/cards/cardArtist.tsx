'use client';
import Image from 'next/image';
import AppButton from '../button/AppButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "@/scss/cards/cardArtist.scss";

export default function CardArtist(props) {
  const { image, name, url } = props;

  return (
    <>
      <div className="cardArtist">
        <div className="cardArtist__top relative">
          <div className="cardArtist__image relative aspect-square mb-4">
            <Image 
              src={image}
              width={300}
              height={300}
              alt={`Artist image: ${name}`}
              priority={true}
            />
          </div>
          <div className="cardArtist__play absolute bottom-2 right-2">
            <AppButton classNames='-with-icon -round -bg-green'>
              <PlayArrowIcon />
            </AppButton>
          </div>
        </div>
        <div className='cardArtist__name'>
          <p className='text-sm md:text-base font-semibold'>{ name }</p>
        </div>
      </div>
    </>
  )
}