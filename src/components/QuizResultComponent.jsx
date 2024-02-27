// QuizResultComponent.jsx
import React from 'react';

const QuizResultComponent = ({ questions, selectedAnswers }) => {
  const decodeString = (str) => decodeURIComponent(str);

  return (
    <div>
      <h2>Quiz Result</h2>
      <p>Total Correct Answers: {calculateCorrectAnswers(questions, selectedAnswers)}</p>
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

const calculateCorrectAnswers = (questions, selectedAnswers) => {
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (decodeURIComponent(question.correct_answer) === decodeURIComponent(selectedAnswers[index])) {
      correctCount++;
    }
  });
  return correctCount;
};

export default QuizResultComponent;
