import React, { useContext } from 'react';
import './ActionBar.scss';

// import classNames from 'classnames';

import { GameContext } from '../../stores/gameStore/reducer';

import Button from '../Button/Button';
import CountCircle from '../CountCircle/CountCircle';

function ActionBar() {
  const { dispatchGame } = useContext(GameContext);

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
