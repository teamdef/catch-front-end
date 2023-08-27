import { css } from 'styled-components';

interface flexOpsProps {
  direction?: string;
  justify?: string;
  align?: string;
}

const flexMixin = (flexOps?: flexOpsProps) => {
  return css`
    display: flex;
    flex-direction: ${flexOps?.direction || 'row'};
    justify-content: ${flexOps?.justify || 'center'};
    align-items: ${flexOps?.align || 'center'};
  `;
};

const flatButtonMixin = css`
  border: none;
  outline: none;
  cursor: pointer;
`;

const mixin = {
  flex: flexMixin,
  flatButton: flatButtonMixin,
};

export default mixin;
