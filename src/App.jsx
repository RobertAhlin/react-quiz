// App.jsx

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
