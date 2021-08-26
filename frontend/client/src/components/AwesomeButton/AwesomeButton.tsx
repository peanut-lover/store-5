import styled from 'styled-components';

const AwesomeButton = styled.button`
  cursor: pointer;
  border: 2px dashed ${(props) => props.theme.line};
  padding: 0.5rem 1rem;
  background-color: white;
  transition: 0.2s;
  font-family: inherit;
  font-size: 1rem;
  border-radius: 1rem;

  :hover {
    border: 2px solid black;
  }

  :disabled {
    cursor: initial;
    color: ${(props) => props.theme.placeholder};
    background-color: ${(props) => props.theme.dustWhite};
    border: 2px dashed ${(props) => props.theme.line};
  }
`;

export default AwesomeButton;
