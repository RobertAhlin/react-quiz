import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const QuizQuestion = ({ question, selectedAnswer, handleAnswerSelect, moveToNextQuestion }) => {
  const decodeString = (str) => {
    return decodeURIComponent(str);
  };

  return (
    <div>
      <h2>Question</h2>
      <p>{decodeString(question.question)}</p>
      <form>
        {question.answers.map((answer, index) => (
          <div key={index}>
            <input 
              type="radio" 
              id={`answer-${index}`} 
              name="answers" 
              value={answer} 
              checked={selectedAnswer === answer}
              onChange={() => handleAnswerSelect(answer)}
            />
            <label htmlFor={`answer-${index}`}>{decodeString(answer)}</label>
          </div>
        ))}
      </form>
      <button onClick={moveToNextQuestion}>Next Question</button>
    </div>
  );
};

// Prop type validation
QuizQuestion.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  }).isRequired,
  selectedAnswer: PropTypes.string.isRequired,
  handleAnswerSelect: PropTypes.func.isRequired,
  moveToNextQuestion: PropTypes.func.isRequired
};

export default QuizQuestion;
