import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const NextButtonComponent = ({ moveToNextQuestion }) => {
  return <Button onClick={moveToNextQuestion}>Next Question</Button>;
};

NextButtonComponent.propTypes = {
  moveToNextQuestion: PropTypes.func.isRequired,
};

export default NextButtonComponent;
