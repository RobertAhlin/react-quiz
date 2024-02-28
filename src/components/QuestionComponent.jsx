import PropTypes from 'prop-types';

const QuestionComponent = ({ questionNumber, question, selectedAnswer, handleAnswerSelect }) => {
  const decodeString = (str) => decodeURIComponent(str);

  return (
    <div>
      <div>
        <strong>Question {questionNumber + 1}:</strong>
      </div>
      <div>
        <p>
          {decodeString(question.question)}
        </p>
      </div>
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


// PropTypes validation
QuestionComponent.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.object.isRequired,
  selectedAnswer: PropTypes.string.isRequired,
  handleAnswerSelect: PropTypes.func.isRequired,
};

export default QuestionComponent;
