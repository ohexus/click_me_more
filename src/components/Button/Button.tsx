import React from 'react';
import './Button.scss';

import classNames from 'classnames';

import { CapitalizeFirstLetter } from '../../helpers/stringCases';

interface ButtonProps {
  customClasses?: string[];
  buttonTitle?: string;
  clickAction?: Function;
}

function Button({
  customClasses = [],
  buttonTitle = 'button',
  clickAction = () => console.log('click'),
}: ButtonProps) {
  return (
    <button
      className={classNames('button', ...customClasses)}
      onClick={() => clickAction()}
    >
      {CapitalizeFirstLetter(buttonTitle)}
    </button>
  );
}

export default Button;
