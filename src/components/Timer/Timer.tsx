import React, { useState, useEffect, useCallback, useReducer } from 'react';
import './Timer.scss';

import timePipe from '../../helpers/timePipe';

import { TimerState } from '../../stores/timer/types';
import { timerReducer } from '../../stores/timer/reducer';

const timerInitialValue: number = 10;
const timerInitialState: TimerState = {
  total: timerInitialValue,
  current: timerInitialValue,
};

function Timer() {
  const [timerWidth, setTimerWidth] = useState<number>(5); // rem

  const [timerState, timerDispatch] = useReducer(
    timerReducer,
    timerInitialState
  );
  // const [timerTotal, setTimerTotal] = useState<number>(10);
  // const [timerState.current, setTimerStimerState.current] = useState<number>(10);

  const widthMultiplier = 1.5;
  const timerStep = 0.1;

  const [isTimerStarted, setIsTimerStarted] = useState<boolean>(false);
  // const [timerId, setTimerId] = useState<NodeJS.Timeout>();

  const increaseTimerLength = (): void => {
    timerDispatch({ type: 'increaseAll' });

    changeTimerWidth();
  };

  const decreaseTimerLength = (): void => {
    if (timerState.total > 1) {
      timerDispatch({ type: 'decreaseAll' });

      changeTimerWidth();
    }
  };

  const multTimerWidth = useCallback((): number => {
    return timerState.current * widthMultiplier;
  }, [timerState]);

  const changeTimerWidth = useCallback((): void => {
    setTimerWidth(multTimerWidth());
  }, [multTimerWidth]);

  const startTimer = (): void => {
    if (!isTimerStarted) {
      setIsTimerStarted(true);
    }
  };

  const finishTimer = useCallback((): void => {
    setIsTimerStarted(false);

    timerDispatch({
      type: 'setCurrent',
      count: timerState.total,
    });
  }, [timerState]);

  useEffect(() => {
    if (isTimerStarted) {
      const timerId = setInterval(() => {
        timerDispatch({
          type: 'setCurrent',
          count: parseFloat((timerState.current - timerStep).toFixed(2)), // correct time fix
        });

        if (timerState.current <= 0) {
          finishTimer();
        }
      }, timerStep * 1000);
      return () => {
        if (timerId) clearInterval(timerId);
      };
    }
  }, [changeTimerWidth, timerState, finishTimer, isTimerStarted]);

  useEffect(() => {
    changeTimerWidth();
  }, [changeTimerWidth, timerState]);

  return (
    <>
      <div className="timer">
        <button onClick={startTimer}>start</button>
        <p className="timer__change-title">Change timer length:</p>
        <div className="timer__controls">
          <button
            className="timer__increase"
            onClick={increaseTimerLength}
            disabled={isTimerStarted}
          >
            Increase
          </button>

          <div className="timer__controls-splitter"></div>

          <button
            className="timer__decrease"
            onClick={decreaseTimerLength}
            disabled={isTimerStarted || timerState.total <= 1}
          >
            Decrease
          </button>
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
