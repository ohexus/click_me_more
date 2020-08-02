import React, { useReducer, useState, useEffect } from 'react';
import './Game.scss';

import {
  gameReducer,
  initialGameState,
  GameContext,
} from '../../stores/gameStore/reducer';
import {
  clicksCountReducer,
  initialClicksCountState,
  ClicksCountContext,
} from '../../stores/clicksCountStore/reducer';
import {
  timerReducer,
  initialTimerState,
  TimerContext,
} from '../../stores/timerStore/reducer';

import ActionBar from '../ActionBar/ActionBar';
import ClickButton from '../ClickButton/ClickButton';
import Timer from '../Timer/Timer';

function Game() {
  const [gameState, dispatchGame] = useReducer(gameReducer, initialGameState);
  const [clicksCountState, dispatchClicksCount] = useReducer(
    clicksCountReducer,
    initialClicksCountState
  );
  const [timerState, dispatchTimer] = useReducer(
    timerReducer,
    initialTimerState
  );

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  useEffect(() => {
    if (gameState.status && !isGameStarted) {
      setIsGameStarted(true);
      dispatchClicksCount({ type: 'reset' });
    }
  }, [gameState.status, isGameStarted]);

  useEffect(() => {
    if (!gameState.status) {
      setIsGameStarted(false);
    }
  }, [gameState.status]);

  return (
    <GameContext.Provider value={{ gameState, dispatchGame }}>
      <ClicksCountContext.Provider
        value={{ clicksCountState, dispatchClicksCount }}
      >
        <TimerContext.Provider value={{ timerState, dispatchTimer }}>
          <div className="game">
            <ActionBar></ActionBar>

            <ClickButton></ClickButton>

            <Timer></Timer>
          </div>
        </TimerContext.Provider>
      </ClicksCountContext.Provider>
    </GameContext.Provider>
  );
}

export default Game;
