import styled from 'styled-components';

const SmallContainedBtn = styled.button<{ error?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  color: #fff;
  padding: 13px 0;
  border-radius: 8px;
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error_1 : theme.colors.secondary_500)};
  background: ${({ theme, error }) => (error ? theme.colors.error_1 : theme.colors.secondary_500)};
  word-break: keep-all;
  &:disabled {
    opacity: 0.5;
    background: ${({ theme, error }) => (error ? theme.colors.error_1 : theme.colors.secondary_500)};
  }
`;

export default SmallContainedBtn;
