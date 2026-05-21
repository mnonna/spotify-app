'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/utils/redux/store';
import QueuePlaylist from '@/components/queue/queuePlaylist';

const QueueTogglePanel = () => {
  const { isQueueVisible } = useSelector((state: RootState) => state.spotifyQueue);

  return (
    <aside
      className={`pageWrapper__queue absolute z-[9999] top-0 right-0 w-full h-full max-w-[600px] overflow-hidden transition-transform duration-300 ${
        isQueueVisible ? 'translate-x-0' : 'translate-x-[100%]'
      }`}
    >
      <QueuePlaylist />
    </aside>
  );
};

export default QueueTogglePanel;
