import React from 'react';

const QuizResults = ({ questions, selectedAnswers }) => {
  const decodeString = (str) => {
    return decodeURIComponent(str);
  };

  const renderQuestionResult = (question, index) => {
    const selectedAnswer = selectedAnswers[index];
    const correctAnswer = question.correct_answer;
    const isCorrect = selectedAnswer === correctAnswer;

    return (
      <div key={index}>
        <p>
          <strong>Question {index + 1}: </strong> {decodeString(question.question)}
        </p>
        <p>
          Your Answer: <span style={{ color: isCorrect ? 'green' : 'red' }}>{decodeString(selectedAnswer)}</span>
        </p>
        <p>
          Correct Answer: <span style={{ color: 'green' }}>{decodeString(correctAnswer)}</span>
        </p>
      </div>
    );
  };

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>You completed the quiz!</p>
      {questions.map((question, index) => renderQuestionResult(question, index))}
    </div>
  );
};

export default QuizResults;
