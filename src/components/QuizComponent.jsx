// components/QuizComponent.jsx

import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../api/Api'; // Corrected import path

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(null); // Changed initial state to null
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Added state to track current question index

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchQuizQuestions();
        setQuestions(data.results.map(question => ({
          ...question,
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        })));
        setSelectedAnswers(Array(data.results.length).fill(''));
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  // Function to decode URL encoded strings
  const decodeString = (str) => {
    return decodeURIComponent(str);
  };

  // Function to shuffle array
  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  // Function to handle selecting an answer
  const handleAnswerSelect = (selectedAnswer) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = selectedAnswer;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  // Function to handle moving to the next question
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
      if (question.correct_answer === selectedAnswers[index]) {
        correctCount++;
      }
    });
    setCorrectAnswers(correctCount);
  };

  // Render quiz questions
  return (
    <div>
      <h2>Quiz Questions</h2>
      {/* Conditionally render the current question */}
      {questions.length > 0 && currentQuestionIndex < questions.length && (
        <div>
          <p>
            <strong>Question {currentQuestionIndex + 1}: </strong> {decodeString(questions[currentQuestionIndex].question)}
          </p>
          <form>
            {questions[currentQuestionIndex].answers.map((answer, answerIndex) => (
              <div key={answerIndex}>
                <input 
                  type="radio" 
                  id={`answer-${answerIndex}`} 
                  name={`answer-${currentQuestionIndex}`} 
                  value={answer} 
                  checked={selectedAnswers[currentQuestionIndex] === answer}
                  onChange={() => handleAnswerSelect(answer)}
                />
                <label htmlFor={`answer-${answerIndex}`}>{decodeString(answer)}</label>
              </div>
            ))}
          </form>
          <button onClick={moveToNextQuestion}>Next Question</button>
        </div>
      )}
      {/* Conditionally render the correct answers section */}
      {correctAnswers !== null && (
        <div>
          <h2>Quiz Result</h2>
          <p>Total Correct Answers: {correctAnswers}</p>
          <h3>Answers:</h3>
          {questions.map((question, index) => (
            <div key={index}>
              <p>
                <strong>Question {index + 1}: </strong> {decodeString(question.question)}
              </p>
              <ul>
                {question.answers.map((answer, answerIndex) => (
                  <li key={answerIndex} style={{ color: answer === question.correct_answer ? 'green' : selectedAnswers[index] === answer ? 'red' : 'inherit' }}>
                    {decodeString(answer)}
                  </li>
                ))}
              </ul>
              <p>Correct Answer: <span style={{ color: 'green' }}>{decodeString(question.correct_answer)}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
