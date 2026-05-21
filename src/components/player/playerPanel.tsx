'use client';
import '@/scss/player/playerWrapper.scss';
import PlayerCurrPlaying from '@/components/player/playerCurrPlaying';
import Player from '@/components/player/player';
import AppButton from '@/components/button/AppButton';
import { useDispatch } from 'react-redux';
import { toggleQueue } from '@/utils/redux/queue';

const PlayerPanel = () => {
  const dispatch = useDispatch();

  return (
    <aside className="playerPanel">
      <div className="playerPanel__wrapper grid grid-cols-7 gap-2">
        <div className="playerPanel__current">
          <PlayerCurrPlaying />
        </div>
        <div className="playerPanel__player">
          <Player />
        </div>
        <div className="playerPanel__actions flex items-center col-start-7">
          <div className="playerPanel__action">
            <AppButton
              classNames="-with-icon -round"
              muiIcon="ViewListIcon"
              onClick={() => dispatch(toggleQueue())}
            />
          </div>
        </div>
      </div>
    </aside>
  )
};

export default PlayerPanel;