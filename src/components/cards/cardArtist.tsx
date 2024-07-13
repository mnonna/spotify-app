'use client';
import Link from 'next/link';
import Image from 'next/image';
import AppButton from '../button/AppButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import "@/scss/cards/cardArtist.scss";

export default function CardArtist(props) {
  const { image, name, uri, id } = props;

  let type = '';
  if (uri && uri.length > 0) {
    const uriSplit = uri.split(':');
    type = uriSplit[1];
  }

  const setPlayerContext = async () => {
    let body = {};
    
    if (type !== 'track') {
      body = {context_uri: uri,}
    } else {
      body = {uris: [uri],}
    }
    
    await fetch(`api/player/set`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  return (
    <>
      <div className="cardArtist relative">
        <div className="cardArtist__link absolute top-0 left-0 w-full h-full">
          <Link href={`/dashboard/${type}/${id}`}></Link>
        </div>
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
          {uri && uri.length > 0 && (
            <div className="cardArtist__play absolute bottom-2 right-2">
              <AppButton classNames='-with-icon -round -bg-green' onClickEvent={setPlayerContext}>
                <PlayArrowIcon />
              </AppButton>
            </div>
          )}
        </div>
        <div className='cardArtist__name'>
          <p className='text-sm md:text-base font-semibold'>{ name }</p>
        </div>
      </div>
    </>
  )
}