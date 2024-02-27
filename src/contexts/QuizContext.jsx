// QuizContext.js
import React, { createContext, useContext, useReducer } from 'react';

const QuizStateContext = createContext();
const QuizDispatchContext = createContext();

const initialState = {
  questions: [],
  selectedAnswers: [],
  correctAnswers: null,
  currentQuestionIndex: 0,
  error: null,
};

const quizReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload };
    case 'SET_SELECTED_ANSWERS':
      return { ...state, selectedAnswers: action.payload };
    case 'SET_CORRECT_ANSWERS':
      return { ...state, correctAnswers: action.payload };
    case 'SET_CURRENT_QUESTION_INDEX':
      return { ...state, currentQuestionIndex: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizStateContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>{children}</QuizDispatchContext.Provider>
    </QuizStateContext.Provider>
  );
};

export const useQuizState = () => {
  const context = useContext(QuizStateContext);
  if (context === undefined) {
    throw new Error('useQuizState must be used within a QuizProvider');
  }
  return context;
};

export const useQuizDispatch = () => {
  const context = useContext(QuizDispatchContext);
  if (context === undefined) {
    throw new Error('useQuizDispatch must be used within a QuizProvider');
  }
  return context;
};
