import styled from 'styled-components';

const NotFound = ({ text }: { text: string }) => {
  return <Wrapper>{text}</Wrapper>;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.colors.blackColors.grey_500};
`;
export default NotFound;
