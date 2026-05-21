'use client';

import '@/scss/playlist/playlistHeader.scss';
import '@/scss/skeletons/playlistHeaderSkeleton.scss';

interface PlaylistHeaderSkeletonProps {
  full?: boolean;
}

export default function PlaylistHeaderSkeleton({ full = false }: PlaylistHeaderSkeletonProps) {
  const classes = full ? '-full' : '';

  return (
    <section className={`playlistHeader playlistHeaderSkeleton flex gap-6 items-end mb-4 last:mb-0 ${classes}`}>
      <div className="playlistHeader__image">
        <div className="playlistHeaderSkeleton__image rounded-lg"></div>
      </div>
      <div className="w-full playlistHeader__content">
        <div className="playlistHeaderSkeleton__bar playlistHeaderSkeleton__type rounded h-3 w-16 mb-2"></div>
        <div className="playlistHeaderSkeleton__bar playlistHeaderSkeleton__title rounded h-12 w-3/4 mb-4"></div>
        <div className="playlistHeaderSkeleton__bar playlistHeaderSkeleton__description rounded h-3 w-1/2 mb-2"></div>
        <div className="playlistHeader__details">
          <div className="playlistHeaderSkeleton__bar rounded h-3 w-24"></div>
          <div className="playlistHeaderSkeleton__bar rounded h-3 w-32"></div>
        </div>
      </div>
    </section>
  );
}
