import PropTypes from 'prop-types';

const ErrorComponent = ({ error }) => {
  return <p>Error: {error}</p>;
};

ErrorComponent.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorComponent;
