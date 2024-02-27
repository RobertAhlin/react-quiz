// QuizComponent.jsx
import React, { useEffect, useMemo, useCallback } from 'react';
import { fetchQuizQuestions } from '../api/Api';
import { useQuizState, useQuizDispatch } from '../contexts/QuizContext';
import QuestionComponent from './QuestionComponent';
import NextButtonComponent from './NextButtonComponent';
import QuizResultComponent from './QuizResultComponent';
import ErrorComponent from './ErrorComponent';

const QuizComponent = () => {
  const state = useQuizState();
  const dispatch = useQuizDispatch();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const cachedData = localStorage.getItem('cachedQuestions');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          dispatch({ type: 'SET_QUESTIONS', payload: parsedData });
          dispatch({ type: 'SET_SELECTED_ANSWERS', payload: Array(parsedData.length).fill('') });
        } else {
          const data = await fetchQuizQuestions();
          if (Array.isArray(data.results)) {
            dispatch({ type: 'SET_QUESTIONS', payload: data.results });
            dispatch({ type: 'SET_SELECTED_ANSWERS', payload: Array(data.results.length).fill('') });
            localStorage.setItem('cachedQuestions', JSON.stringify(data.results));
          } else {
            dispatch({ type: 'SET_ERROR', payload: 'Invalid data format' });
          }
        }
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Error fetching quiz questions' });
      }
    };

    fetchQuestions();
  }, [dispatch]);

  const decodeString = useCallback((str) => {
    return decodeURIComponent(str);
  }, []);

  const moveToNextQuestion = useCallback(() => {
    if (state.currentQuestionIndex < state.questions.length - 1) {
      dispatch({ type: 'SET_CURRENT_QUESTION_INDEX', payload: state.currentQuestionIndex + 1 });
    } else {
      calculateCorrectAnswers();
    }
  }, [dispatch, state.currentQuestionIndex, state.questions.length]);

  const calculateCorrectAnswers = useCallback(() => {
    let correctCount = 0;
    state.questions.forEach((question, index) => {
      if (decodeString(question.correct_answer) === decodeString(state.selectedAnswers[index])) {
        correctCount++;
      }
    });
    dispatch({ type: 'SET_CORRECT_ANSWERS', payload: correctCount });
  }, [decodeString, dispatch, state.questions, state.selectedAnswers]);

  const renderContent = useMemo(() => {
    if (state.error) {
      return <ErrorComponent error={state.error} />;
    } else if (state.questions.length > 0 && state.currentQuestionIndex < state.questions.length) {
      return (
        <div>
          <QuestionComponent
            questionNumber={state.currentQuestionIndex}
            question={state.questions[state.currentQuestionIndex]}
          />
          <NextButtonComponent moveToNextQuestion={moveToNextQuestion} />
        </div>
      );
    } else if (state.correctAnswers !== null) {
      return <QuizResultComponent />;
    }
  }, [
    state.error,
    state.questions,
    state.currentQuestionIndex,
    state.correctAnswers,
    moveToNextQuestion,
  ]);

  return <div>{renderContent}</div>;
};

export default QuizComponent;
