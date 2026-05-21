'use client';

import React, { Suspense, useEffect } from 'react';
import { fetchQueue } from '@/utils/redux/queue';
import { useAppDispatch, useAppSelector } from '@/utils/redux/store';
import PlaylistHeader from "@/components/playlist/playlistHeader";
import PlaylistItems from '../playlist/playlistItems';
import '@/scss/queue/queuePlaylist.scss';

const QueuePlaylist = () => {
  const dispatch = useAppDispatch();
  const { queue, loading, error } = useAppSelector((state) => state.spotifyQueue);

  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch]);

  const contentClassName = loading
    ? 'queuePlaylist__content -dimmed'
    : 'queuePlaylist__content';

  return (
    <div className="queuePlaylist box box-bg-black">
      {error && <p className="queuePlaylist__error">Error: {error}</p>}
      <div className={contentClassName}>
        <Suspense>
          <PlaylistHeader name="Current queue" headerClass="!mb-0 text-3xl" headerType="queue" />
          {queue.length > 0 && (
            <PlaylistItems uri={null} tracks={queue} type="queue" />
          )}
        </Suspense>
      </div>
      {loading && (
        <div className="queuePlaylist__overlay" aria-busy="true" aria-label="Loading queue">
          <div className="queuePlaylist__spinner" />
        </div>
      )}
    </div>
  );
};

export default QueuePlaylist;
