// LoadingComponent.jsx

import styled from 'styled-components';

// Styled component for the loading spinner
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingComponent = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Spinner />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
