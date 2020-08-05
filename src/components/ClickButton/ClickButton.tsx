import React, { useContext, useState, useEffect, useCallback } from 'react';
import './ClickButton.scss';

import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames';

import { GameContext } from '../../stores/gameStore/reducer';
import { ClicksCountContext } from '../../stores/clicksCountStore/reducer';

import { titleCase } from '../../helpers/stringCases';
import useClicksSpeed from '../../hooks/useClicksSpeed';

interface Circle {
  id: string;
}

function ClickButton() {
  const { gameState } = useContext(GameContext);
  const { dispatchClicksCount } = useContext(ClicksCountContext);

  const [clicksPerStep, setClicksPerStep] = useState(0);
  const [clicksSpeed, changeSpeed, resetSpeed] = useClicksSpeed();

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>();

  const [circles, setCircles] = useState<Circle[]>([]);

  const onClick = () => {
    dispatchClicksCount({ type: 'increase' });
    increaseClicks();
    addCircle();
  };

  const addCircle = () => {
    setCircles([...circles, { id: uuidv4() }]);
  };

  const increaseClicks = () => {
    setClicksPerStep(clicksPerStep + 1);
  };

  const resetClicks = useCallback(() => {
    setClicksPerStep(0);
  }, []);

  useEffect(() => {
    if (gameState.status) {
      if (!timerId) {
        const id = setTimeout(() => {
          changeSpeed(clicksPerStep);
          setTimerId(null);
        }, 100);

        setTimerId(id);
        resetClicks();
      }
    }
    if (!gameState.status && !!clicksSpeed) {
      resetSpeed();
    }
  }, [
    gameState.status,
    timerId,
    clicksPerStep,
    clicksSpeed,
    changeSpeed,
    resetClicks,
    resetSpeed,
  ]);

  useEffect(() => {
    if (!gameState.status) {
      setTimeout(() => {
        setCircles([]);
      }, 1250); // circle animation time
    }
  }, [gameState.status]);

  return (
    <div
      className="click-button"
      onClick={() => (gameState.status ? onClick() : null)}
    >
      <div className="click-button__list-wrapper">
        <ul className="click-button__list">
          <li
            className={classNames('click-button__text', {
              'click-button__text--displayed': gameState.status,
            })}
          >
            {clicksSpeed} c/s
          </li>
          <li
            className={classNames('click-button__text', {
              'click-button__text--displayed':
                !gameState.status && !gameState.delay.status,
            })}
          >
            {titleCase(gameState.isFirstGame ? 'press start' : 'game over!')}
          </li>
          <li
            className={classNames('click-button__text', {
              'click-button__text--displayed': gameState.delay.status,
            })}
          >
            {gameState.delay.count > 0
              ? gameState.delay.count
              : titleCase('go!')}
          </li>
        </ul>
      </div>
      {circles.map((circle) => (
        <div key={circle.id} className="click-button__circle"></div>
      ))}
    </div>
  );
}

export default ClickButton;
