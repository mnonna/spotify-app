'use client';
import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/math";
import '@/scss/playlist/playlistHeader.scss';

interface PlaylistHeaderProps {
  name: string;
  description: string;
  image: string;
  type: string;
  owner: string;
  followersCount: number;
  full?: boolean;
}

export default function PlaylistHeader({ name, description, image, type, owner, followersCount, full }: PlaylistHeaderProps) {
  const followers = formatNumberWithSpaces(followersCount);
  const classes = full ? '-full' : '';

  let imageWidth = 300;
  let imageHeight = 300;

  if (full) {
    imageWidth = 640;
    imageHeight = 640;
  }

  return (
    <section className={`playlistHeader ${classes}`}>
      <div className="playlistHeader__image">
        <Image 
          src={image}
          width={imageWidth}
          height={imageHeight}
          alt={`Playlist image: ${name}`}
          priority={true}
        />
      </div>
      <div className="playlistHeader__content">
        <p className="playlistHeader__type text-sm font-medium">{ type }</p>
        <p className="playlistHeader__title text-7xl font-bold ">{ name }</p>
        <p className="text-sm font-medium">{ description }</p>
        {( owner || followers) && 
          <div className="playlistHeader__details">
            {owner && 
              <div className="playlistHeader__detail">
                <p className="text-sm font-bold">{ owner }</p>
              </div>
            }
            {followers && 
              <div className="playlistHeader__detail">
                <div>&bull;</div><p className="text-sm font-medium">saved { followers } times</p>
              </div>
            }
          </div>
        }
      </div>
    </section>
  )
}