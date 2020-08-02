import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Timer.scss';

import { GameContext } from '../../stores/gameStore/reducer';
import { TimerContext } from '../../stores/timerStore/reducer';

import Button from '../Button/Button';

import timePipe from '../../helpers/timePipe';
import fixFloat from '../../helpers/fixFloat';

function Timer() {
  const { gameState, dispatchGame } = useContext(GameContext);
  const { timerState, dispatchTimer } = useContext(TimerContext);

  const [timerWidth, setTimerWidth] = useState<number>(5); // rem

  const widthMultiplier = 1.5;
  const timerStep = 0.1;

  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);

  const increaseTimerLength = (): void => {
    dispatchTimer({ type: 'increaseAll' });

    changeTimerWidth();
  };

  const decreaseTimerLength = (): void => {
    if (timerState.total > 1) {
      dispatchTimer({ type: 'decreaseAll' });

      changeTimerWidth();
    }
  };

  const multTimerWidth = useCallback((): number => {
    return timerState.current * widthMultiplier;
  }, [timerState]);

  const changeTimerWidth = useCallback((): void => {
    setTimerWidth(multTimerWidth());
  }, [multTimerWidth]);

  const startTimer = useCallback((): void => {
    if (!isTimerStarted) {
      setIsTimerStarted(true);
    }
  }, [isTimerStarted]);

  const finishTimer = useCallback((): void => {
    dispatchGame({ type: 'stop' });
    dispatchTimer({
      type: 'setCurrent',
      count: timerState.total,
    });

    setIsTimerStarted(false);
  }, [dispatchGame, dispatchTimer, timerState]);

  useEffect(() => {
    if (isTimerStarted) {
      const timerId = setInterval(() => {
        dispatchTimer({
          type: 'setCurrent',
          count: fixFloat(timerState.current - timerStep),
        });

        if (timerState.current <= 0) {
          finishTimer();
        }
      }, timerStep * 1000);
      return () => {
        if (timerId) clearInterval(timerId);
      };
    }
  }, [isTimerStarted, dispatchTimer, timerState, finishTimer]);

  useEffect(() => {
    changeTimerWidth();
  }, [changeTimerWidth]);

  useEffect(() => {
    if (gameState.status && !isTimerStarted) {
      startTimer();
    }
    if (!gameState.status && isTimerStarted) {
      finishTimer();
    }
  }, [gameState.status, isTimerStarted, startTimer, finishTimer]);

  return (
    <>
      <div className="timer">
        <p className="timer__change-title">Change timer length:</p>
        <div className="timer__controls controls">
          <Button
            customClasses={['button--timer', 'button--timer--left']}
            clickAction={increaseTimerLength}
            buttonTitle={'increase'}
            disabled={isTimerStarted}
          ></Button>

          <div className="controls__splitter"></div>

          <Button
            customClasses={['button--timer', 'button--timer--right']}
            clickAction={decreaseTimerLength}
            buttonTitle={'decrease'}
            disabled={isTimerStarted || timerState.total <= 1}
          ></Button>
        </div>

        <div className="timer__value">{timePipe(timerState.current)}</div>

        <label htmlFor="range"></label>
        <input
          className="timer__range"
          name="range"
          type="range"
          min="0"
          max="1"
          disabled
          style={{ width: `${timerWidth}rem` }}
        />
      </div>
    </>
  );
}

export default Timer;
