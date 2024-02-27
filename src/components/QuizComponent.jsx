import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../api/Api';

// Question component
const Question = ({ question, selectedAnswer, handleAnswerSelect }) => {
  const decodeString = (str) => decodeURIComponent(str);

  return (
    <div>
      <p>
        <strong>Question: </strong> {decodeString(question.question)}
      </p>
      <form>
        {question.answers.map((answer, answerIndex) => (
          <div key={answerIndex}>
            <input
              type="radio"
              id={`answer-${answerIndex}`}
              name="answer"
              value={answer}
              checked={selectedAnswer === answer}
              onChange={() => handleAnswerSelect(answer)}
            />
            <label htmlFor={`answer-${answerIndex}`}>{decodeString(answer)}</label>
          </div>
        ))}
      </form>
    </div>
  );
};

// QuizResult component
const QuizResult = ({ questions, selectedAnswers }) => {
  const decodeString = (str) => decodeURIComponent(str);

  return (
    <div>
      <h2>Quiz Result</h2>
      <h3>Answers:</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <p>
            <strong>Question {index + 1}: </strong> {decodeString(question.question)}
          </p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li
                key={answerIndex}
                style={{
                  color:
                    answer === question.correct_answer
                      ? 'green'
                      : selectedAnswers[index] === answer
                      ? 'red'
                      : 'inherit',
                }}
              >
                {decodeString(answer)}
              </li>
            ))}
          </ul>
          <p>
            Correct Answer: <span style={{ color: 'green' }}>{decodeString(question.correct_answer)}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

// Quiz component
const QuizComponent = () => {
  // State variables
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [error, setError] = useState(null);

  // Fetch quiz questions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem('cachedQuestions');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setQuestions(parsedData);
          setSelectedAnswers(Array(parsedData.length).fill(''));
        } else {
          const shuffledQuestions = await fetchQuizQuestions();
          setQuestions(shuffledQuestions);
          setSelectedAnswers(Array(shuffledQuestions.length).fill(''));
          localStorage.setItem('cachedQuestions', JSON.stringify(shuffledQuestions));
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  // Function to handle answer selection
  const handleAnswerSelect = (selectedAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  // Function to move to the next question
  const moveToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateCorrectAnswers();
    }
  };

  // Function to calculate correct answers
  const calculateCorrectAnswers = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (decodeURIComponent(question.correct_answer) === decodeURIComponent(selectedAnswers[index])) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div>
          <Question
            question={questions[currentQuestionIndex]}
            selectedAnswer={selectedAnswers[currentQuestionIndex]}
            handleAnswerSelect={handleAnswerSelect}
          />
          <button onClick={moveToNextQuestion}>Next Question</button>
        </div>
      )}
      {correctAnswers !== null && (
        <QuizResult questions={questions} selectedAnswers={selectedAnswers} />
      )}
    </div>
  );
};

export default QuizComponent;
