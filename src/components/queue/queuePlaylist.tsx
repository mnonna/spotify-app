'use client';

import React, { Suspense, useEffect } from 'react';
import { fetchQueue } from '@/utils/redux/queue';
import { useAppDispatch, useAppSelector } from '@/utils/redux/store';
import PlaylistHeader from "@/components/playlist/playlistHeader";
import PlaylistItems from '../playlist/playlistItems';

const QueuePlaylist = () => {
  const dispatch = useAppDispatch();
  const { queue, loading, error } = useAppSelector((state) => state.spotifyQueue);

  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='queuePlaylist box box-bg-black'>
      <Suspense>
        <PlaylistHeader name="Current queue" headerClass="!mb-0 text-3xl" headerType="queue"/>
        <PlaylistItems uri={null} tracks={queue} type={'queue'} />
      </Suspense>
    </div>
  )
};

export default QueuePlaylist;