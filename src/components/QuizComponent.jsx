// QuizComponent.jsx
import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../api/Api';
import QuestionComponent from './QuestionComponent';
import NextButtonComponent from './NextButtonComponent';
import QuizResultComponent from './QuizResultComponent';
import ErrorComponent from './ErrorComponent';

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const cachedData = localStorage.getItem('cachedQuestions');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setQuestions(parsedData);
          setSelectedAnswers(Array(parsedData.length).fill(''));
        } else {
          const data = await fetchQuizQuestions();
          if (Array.isArray(data.results)) {
            setQuestions(data.results);
            setSelectedAnswers(Array(data.results.length).fill(''));
            localStorage.setItem('cachedQuestions', JSON.stringify(data.results));
          } else {
            setError('Invalid data format');
          }
        }
      } catch (error) {
        setError('Error fetching quiz questions');
      }
    };

    fetchQuestions();
  }, []);

  const decodeString = (str) => {
    return decodeURIComponent(str);
  };

  const handleAnswerSelect = (selectedAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateCorrectAnswers();
    }
  };

  const calculateCorrectAnswers = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (decodeString(question.correct_answer) === decodeString(selectedAnswers[index])) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
  };

  return (
    <div>
      {error && <ErrorComponent error={error} />}
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div>
          <QuestionComponent
            questionNumber={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            handleAnswerSelect={handleAnswerSelect}
          />
          <NextButtonComponent moveToNextQuestion={moveToNextQuestion} />
        </div>
      )}

      {correctAnswers !== null && <QuizResultComponent questions={questions} selectedAnswers={selectedAnswers} />}
    </div>
  );
};

export default QuizComponent;
