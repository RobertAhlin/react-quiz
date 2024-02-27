// components/QuizComponent.jsx

import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../api/Api'; // Corrected import path

const QuizComponent = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchQuizQuestions();
        setQuestions(data.results.map(question => ({
          ...question,
          answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        })));
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

  return (
    <div>
      <h2>Quiz Questions</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <p>
            <strong>Question {index + 1}: </strong> {decodeString(question.question)}
          </p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>{decodeString(answer)}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default QuizComponent;
