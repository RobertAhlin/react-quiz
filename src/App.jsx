// App.js

import React from 'react';
import { QuizProvider } from './contexts/QuizContext';
import QuizComponent from './components/QuizComponent';

const App = () => {
  return (
    <QuizProvider>
      <QuizComponent />
    </QuizProvider>
  );
};

export default App;
