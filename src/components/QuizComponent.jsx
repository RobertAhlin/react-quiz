import { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../api/api';
import QuestionComponent from './QuestionComponent';
import NextButtonComponent from './NextButtonComponent';
import QuizResultComponent from './QuizResultComponent';
import ErrorComponent from './ErrorComponent';
import RestartButtonComponent from './RestartButtonComponent'; // Import the RestartButtonComponent

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

  useEffect(() => {
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
    setQuizCompleted(true);
  };

  const handleRestartQuiz = () => {
    setQuestions([]);
    setSelectedAnswers([]);
    setCorrectAnswers(null);
    setCurrentQuestionIndex(0);
    setError(null);
    setQuizCompleted(false);
    fetchQuestions(); // Fetch new questions
  };

  return (
    <div>
      {error && <ErrorComponent error={error} />}
      {!quizCompleted && questions.length > 0 && currentQuestionIndex < questions.length && (
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

      {quizCompleted && (
        <div>
          <QuizResultComponent questions={questions} selectedAnswers={selectedAnswers} />
          <RestartButtonComponent onClick={handleRestartQuiz} /> {/* Render RestartButtonComponent */}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
