import React, { useContext, useState, useEffect, useCallback } from 'react';
import './ClickButton.scss';

import classNames from 'classnames';

import { GameContext } from '../../stores/gameStore/reducer';
import { ClicksCountContext } from '../../stores/clicksCountStore/reducer';

import { titleCase } from '../../helpers/stringCases';
import useClicksSpeed from '../../hooks/useClicksSpeed';

interface ClickButtonProps {
  customClasses?: string[];
}

function ClickButton({ customClasses = [] }: ClickButtonProps) {
  const { gameState } = useContext(GameContext);
  const { dispatchClicksCount } = useContext(ClicksCountContext);

  const [clicksPerStep, setClicksPerStep] = useState(0);
  const [clicksSpeed, changeSpeed, resetSpeed] = useClicksSpeed();

  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>();

  const [circles, setCircles] = useState(['circle']);

  const onClick = () => {
    dispatchClicksCount({ type: 'increase' });
    increaseClicks();
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

  return (
    <div
      className="click-button"
      onClick={() => (gameState.status ? onClick() : null)}
    >
      <div className="click-button__list-wrapper">
        <ul className="click-button__list">
          <li className={classNames('click-button__text')}>
            {gameState.status ? `${clicksSpeed} c/s` : titleCase('game over!')}
          </li>
        </ul>
      </div>
      {circles.map((circle) => (
        <div key={circle} className="click-button__circle"></div>
      ))}
    </div>
  );
}

export default ClickButton;
