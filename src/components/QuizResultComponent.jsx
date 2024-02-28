import PropTypes from 'prop-types';
import styled from 'styled-components';

const QuizResultContainer = styled.div``;
const QuestionContainer = styled.div``;
const CorrectAnswer = styled.span`
  color: green;
`;
const IncorrectAnswer = styled.span`
  color: red;
`;

const QuizResultComponent = ({ questions, selectedAnswers }) => {
  const decodeString = (str) => decodeURIComponent(str);

  const calculateColor = (question, answer, selectedAnswer) => {
    if (answer === question.correct_answer) {
      return <CorrectAnswer>{decodeString(answer)}</CorrectAnswer>;
    } else if (selectedAnswer === answer) {
      return <IncorrectAnswer>{decodeString(answer)}</IncorrectAnswer>;
    } else {
      return decodeString(answer);
    }
  };

  return (
    <QuizResultContainer>
      <h2>Quiz Result</h2>
      <p>Total Correct Answers: {calculateCorrectAnswers(questions, selectedAnswers)}</p>
      <h3>Answers:</h3>
      {questions.map((question, index) => (
        <QuestionContainer key={index}>
          <p>
            <strong>Question {index + 1}: </strong> {decodeString(question.question)}
          </p>
          <ul>
            {question.answers.map((answer, answerIndex) => (
              <li key={answerIndex}>{calculateColor(question, answer, selectedAnswers[index])}</li>
            ))}
          </ul>
          <p>
            Correct Answer: <CorrectAnswer>{decodeString(question.correct_answer)}</CorrectAnswer>
          </p>
        </QuestionContainer>
      ))}
    </QuizResultContainer>
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

QuizResultComponent.propTypes = {
  questions: PropTypes.array.isRequired,
  selectedAnswers: PropTypes.array.isRequired,
};

export default QuizResultComponent;
