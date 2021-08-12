import styled from 'styled-components';

interface Props {
  fullWidth?: boolean;
}

const Button = styled.button<Props>`
  cursor: pointer;
  color: white;
  border: none;
  background-color: ${(props) => props.theme.primary};
  margin: 0;
  padding: 1.25rem;
  font-size: 1.125rem;
  font-weight: bolder;
  width: ${(props) => (props.fullWidth ? '100%' : 'initial')};

  transition: 0.2s linear;

  :hover {
    background-color: ${(props) => props.theme.lightPrimary};
  }

  :disabled {
    cursor: initial;
    color: #ddd;
    background-color: #eee;
  }
`;

export default Button;
