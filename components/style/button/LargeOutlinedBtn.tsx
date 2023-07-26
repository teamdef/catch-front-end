import styled from 'styled-components';
import { theme } from 'styles/theme';

const LargeOutlinedBtn = styled.button`
  border-radius: 8px;
  border: 1px solid ${theme.colors.secondary_200};
  color: ${theme.colors.secondary_300};
  font-size: ${theme.fontSize.body_1};
  font-weight: ${theme.fontWeight.bold};
  background: #fff;
  padding: 19px 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    margin-right: 12px;
  }
`;

export default LargeOutlinedBtn;
