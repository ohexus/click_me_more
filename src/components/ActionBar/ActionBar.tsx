import React, { useContext, useEffect } from 'react';
import './ActionBar.scss';

import { GameContext } from '../../stores/gameStore/reducer';

import Button from '../Button/Button';
import CountCircle from '../CountCircle/CountCircle';

function ActionBar() {
  const { gameState, dispatchGame } = useContext(GameContext);

  useEffect(() => {
    if (
      gameState.delay.status &&
      gameState.delay.count > -1 &&
      !gameState.status
    ) {
      const timerId = setTimeout(() => {
        dispatchGame({ type: 'decreaseDelayCount' });
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [gameState, dispatchGame]);

  return (
    <div className="action-bar">
      <Button
        clickAction={() => dispatchGame({ type: 'start' })}
        buttonTitle={'start'}
      ></Button>

      <CountCircle></CountCircle>

      <Button
        clickAction={() => dispatchGame({ type: 'stop' })}
        buttonTitle={'stop'}
      ></Button>
    </div>
  );
}

export default ActionBar;
