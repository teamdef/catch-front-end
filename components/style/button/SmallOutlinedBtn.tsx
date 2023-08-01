import styled from 'styled-components';

const SmallOutlinedBtn = styled.button`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.secondary_200};
  color: ${({ theme }) => theme.colors.secondary_300};
  background: #fff;
  padding: 13px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 12px;
  }
`;

export default SmallOutlinedBtn;
