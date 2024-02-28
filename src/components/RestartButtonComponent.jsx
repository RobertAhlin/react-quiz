import PropTypes from 'prop-types';

const RestartButtonComponent = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Restart Quiz
    </button>
  );
};

RestartButtonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default RestartButtonComponent;
