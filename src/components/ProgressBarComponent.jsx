import styled from 'styled-components';

// Styled component for the progress bar
const ProgressBar = styled.div`
  background-color: #32a852; /* Green color for the progress bar */
  height: 10px;
  border-radius: 5px;
`;

const ProgressBarComponent = ({ progress }) => {
    return <ProgressBar style={{ width: `${progress}%` }} />;
  };

export default ProgressBarComponent;
