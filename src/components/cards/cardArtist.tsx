import Link from 'next/link';
import Image from 'next/image';
import AppButton from '../button/AppButton';
import Placeholder from '../../../public/placeholder.svg';
import "@/scss/cards/cardArtist.scss";

export default function CardArtist(props) {
  const { image, name, uri, id } = props;

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

  const setPlayerContext = async () => {
    let body = {};
    
    if (type !== 'track') {
      body = {context_uri: uri,}
    } else {
      body = {uris: [uri],}
    }
    
    await fetch(`/api/player/set`, {
      method: 'PUT',
      body: JSON.stringify(body)
    })
  }

  return (
    <>
      <div className="cardArtist relative">
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
              <AppButton classNames='-with-icon -round -bg-green' onClick={setPlayerContext} muiIcon='PlayArrow' />
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