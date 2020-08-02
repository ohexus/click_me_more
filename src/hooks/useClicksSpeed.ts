import { useState } from 'react';

interface SpeedObject {
  steps: {
    clicksStep1: number;
    clicksStep2: number;
    clicksStep3: number;
    clicksStep4: number;
    clicksStep5: number;
    clicksStep6: number;
    clicksStep7: number;
    clicksStep8: number;
    clicksStep9: number;
  };
  value: number;
}

const initialSpeed: SpeedObject = {
  steps: {
    clicksStep1: 0,
    clicksStep2: 0,
    clicksStep3: 0,
    clicksStep4: 0,
    clicksStep5: 0,
    clicksStep6: 0,
    clicksStep7: 0,
    clicksStep8: 0,
    clicksStep9: 0,
  },
  value: 0,
};

export default function useClicksSpeed() {
  const [speed, setSpeed] = useState<SpeedObject>(initialSpeed);

  const sumSteps = (currentStep: number) => {
    return (
      speed.steps.clicksStep9 +
      speed.steps.clicksStep8 +
      speed.steps.clicksStep7 +
      speed.steps.clicksStep6 +
      speed.steps.clicksStep5 +
      speed.steps.clicksStep4 +
      speed.steps.clicksStep3 +
      speed.steps.clicksStep2 +
      speed.steps.clicksStep1 +
      currentStep
    );
  };

  const changeSpeed = (currentStep: number): void => {
    const newSpeed: SpeedObject = {
      steps: {
        clicksStep9: speed.steps.clicksStep8,
        clicksStep8: speed.steps.clicksStep7,
        clicksStep7: speed.steps.clicksStep6,
        clicksStep6: speed.steps.clicksStep5,
        clicksStep5: speed.steps.clicksStep4,
        clicksStep4: speed.steps.clicksStep3,
        clicksStep3: speed.steps.clicksStep2,
        clicksStep2: speed.steps.clicksStep1,
        clicksStep1: currentStep,
      },
      value: sumSteps(currentStep),
    };

    setSpeed(newSpeed);
  };

  const resetSpeed = () => {
    const newSpeed: SpeedObject = {
      steps: {
        clicksStep9: 0,
        clicksStep8: 0,
        clicksStep7: 0,
        clicksStep6: 0,
        clicksStep5: 0,
        clicksStep4: 0,
        clicksStep3: 0,
        clicksStep2: 0,
        clicksStep1: 0,
      },
      value: 0,
    };

    setSpeed(newSpeed);
  };

  return [speed.value, changeSpeed, resetSpeed] as const;
}
