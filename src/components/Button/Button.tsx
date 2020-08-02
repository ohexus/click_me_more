import React from 'react';
import './Button.scss';

import classNames from 'classnames';

import { capitalizeFirstLetter } from '../../helpers/stringCases';

interface ButtonProps {
  customClasses?: string[];
  buttonTitle?: string;
  clickAction?: Function;
  disabled?: boolean;
}

function Button({
  customClasses = [],
  buttonTitle = 'button',
  clickAction = () => console.log('click'),
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'button',
        { 'button--disabled': disabled },
        ...customClasses
      )}
      onClick={() => (disabled ? null : clickAction())}
      disabled={disabled}
    >
      {capitalizeFirstLetter(buttonTitle)}
    </button>
  );
}

export default Button;
