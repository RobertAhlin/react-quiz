import React from 'react';

const RestartButtonComponent = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Restart Quiz
    </button>
  );
};

export default RestartButtonComponent;
