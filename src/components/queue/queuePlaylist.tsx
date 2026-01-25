'use client';

import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQueue } from '@/utils/redux/queue';
import { RootState } from '@/utils/redux/store';
import PlaylistHeader from "@/components/playlist/playlistHeader";
import PlaylistItems from '../playlist/playlistItems';

const QueuePlaylist = () => {
  const dispatch = useDispatch();
  const { queue, loading, error } = useSelector((state: RootState) => state.spotifyQueue);

  useEffect(() => {
    dispatch(fetchQueue());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='queuePlaylist box box-bg-black'>
      <Suspense>
        <PlaylistHeader name="Current queue" headerClass="text-3xl"/>
        <PlaylistItems uri={null} tracks={queue} type={'queue'} />
      </Suspense>
    </ div>
  )
};

export default QueuePlaylist;