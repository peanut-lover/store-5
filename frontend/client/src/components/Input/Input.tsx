import styled from 'styled-components';

interface Props {
  width?: string;
}

const Input = styled.input<Props>`
  padding: 0.25rem 0.5rem;
  border: 1px solid #ccc;
  width: ${(props) => props.width ?? '16rem'};
  outline: none;
  font-size: 1rem;
  transition: 0.2s linear;

  :focus {
    border: 1px solid black;
  }

  ::placeholder {
    color: #ccc;
  }

  :disabled {
    color: #ccc;
    background-color: #eee;
  }
`;

export default Input;
