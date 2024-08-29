'use client';
import '@/scss/player/playerWrapper.scss';
import PlayerCurrPlaying from '@/components/player/playerCurrPlaying';
import Player from '@/components/player/player';

const PlayerPanel = () => {
  return (
    <aside className="playerPanel">
      <div className="playerPanel__wrapper grid grid-cols-7 gap-2">
        <div className="playerPanel__current">
          <PlayerCurrPlaying />
        </div>
        <div className="playerPanel__player">
          <Player />
        </div>
        <div className="playerPanel__actions"></div>
      </div>
    </aside>
  )
};

export default PlayerPanel;