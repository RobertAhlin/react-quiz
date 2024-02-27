import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions } from '../api/Api';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await fetchQuizQuestions();
        // Decode questions and options
        const decodedQuestions = data.results.map(question => ({
          ...question,
          question: decodeURIComponent(question.question),
          incorrect_answers: question.incorrect_answers.map(answer => decodeURIComponent(answer)),
          correct_answer: decodeURIComponent(question.correct_answer)
        }));
        setQuestions(decodedQuestions);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  return (
    <div>
      <h2>Quiz Questions</h2>
      {questions.map((question, index) => (
        <div key={index}>
          <h3>Question {index + 1}</h3>
          <p>{question.question}</p>
          <ul>
            {question.incorrect_answers.map((answer, i) => (
              <li key={i}>{answer}</li>
            ))}
            <li>{question.correct_answer}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Quiz;