'use client';
import Image from "next/image";
import '@/scss/playlist/playlistHeader.scss';

export default function PlaylistHeader({ name, description, image, type }) {
  return (
    <section className="playlistHeader">
      <div className="playlistHeader__image">
        <Image 
          src={image}
          width={300}
          height={300}
          alt={`Playlist image: ${name}`}
          priority={true}
        />
      </div>
      <div className="playlistHeader__content">
        <p className="playlistHeader__type text-sm font-medium">{ type }</p>
        <p className="playlistHeader__title text-7xl font-bold ">{ name }</p>
        <p className="text-sm font-medium">{ description }</p>
      </div>
    </section>
  )
}