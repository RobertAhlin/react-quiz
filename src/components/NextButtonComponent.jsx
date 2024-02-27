// NextButtonComponent.jsx
import React from 'react';

const NextButtonComponent = ({ moveToNextQuestion }) => {
  return <button onClick={moveToNextQuestion}>Next Question</button>;
};

export default NextButtonComponent;
