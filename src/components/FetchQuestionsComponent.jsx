import React, { useEffect, useState } from 'react';
import { fetchQuizQuestions } from '../api/Api';

const FetchQuestionsComponent = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const fetchedQuestions = await fetchQuizQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };

    getQuestions();
  }, []);

  return (
    <div>
      <h2>Quiz Questions</h2>
      <ol>
        {questions.map((question, index) => (
          <li key={index}>
            <p>{question.question}</p>
            <ul>
              {question.options.map((option, optionIndex) => (
                <li key={optionIndex}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default FetchQuestionsComponent;
