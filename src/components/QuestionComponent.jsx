//QuiestionComponent.jsx
import React from 'react';

const QuestionComponent = ({ questionNumber, question, selectedAnswer, handleAnswerSelect }) => {
  const decodeString = (str) => decodeURIComponent(str);

  return (
    <div>
      <p>
        <strong>Question {questionNumber + 1}: </strong> {decodeString(question.question)}
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

export default QuestionComponent;
