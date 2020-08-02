import React, { useContext, useState } from 'react';
import './ClickButton.scss';

import classNames from 'classnames';

import { GameContext } from '../../stores/gameStore/reducer';
import { ClicksCountContext } from '../../stores/clicksCountStore/reducer';

import { titleCase } from '../../helpers/stringCases';

interface ClickButtonProps {
  customClasses?: string[];
}

function ClickButton({ customClasses = [] }: ClickButtonProps) {
  const { gameState } = useContext(GameContext);
  const { dispatchClicksCount } = useContext(ClicksCountContext);

  const onClick = () => {
    dispatchClicksCount({ type: 'increase' });
  };

  const [circles, setCircles] = useState(['circle']);

  return (
    <div
      className="click-button"
      onClick={() => (gameState.status ? onClick() : null)}
    >
      <div className="click-button__list-wrapper">
        <ul className="click-button__list">
          <li className={classNames('click-button__text')}>
            {gameState.status ? `clicksSpeed c/s` : titleCase('game over!')}
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
