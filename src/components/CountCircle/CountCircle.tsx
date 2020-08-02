import React, { useContext, useState, useEffect, useCallback } from 'react';
import './CountCircle.scss';

import { ClicksCountContext } from '../../stores/clicksCountStore/reducer';
import usePreviousValue from '../../hooks/usePreviousValue';

function CountCircle() {
  const { clicksCountState } = useContext(ClicksCountContext);
  const prevCount = usePreviousValue(clicksCountState.count);

  const [fontSize, setFontSize] = useState<number>(1.5);
  const [fontSizeStep, setFontSizeStep] = useState<number>(0.01);

  const calculateFontSize = useCallback(() => {
    if (clicksCountState.count) {
      setFontSize(fontSize + fontSizeStep);
    } else {
      setFontSize(1.5);
    }
  }, [clicksCountState.count, fontSize, fontSizeStep]);

  useEffect(() => {
    if (
      clicksCountState.count !== prevCount &&
      clicksCountState.count % 10 === 0
    ) {
      setFontSizeStep(fontSizeStep - fontSizeStep / 1.5);
    }
  }, [clicksCountState.count, prevCount, fontSizeStep]);

  useEffect(() => {
    if (clicksCountState.count !== prevCount) {
      calculateFontSize();
    }
  }, [clicksCountState.count, prevCount, calculateFontSize]);

  return (
    <div className="count">
      <h3
        className="count__number"
        style={{
          fontSize: `${fontSize}rem`,
        }}
      >
        {clicksCountState.count}
      </h3>
    </div>
  );
}

export default CountCircle;
