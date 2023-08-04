import React from 'react';
import styled, { keyframes } from 'styled-components';

const ProgressCircle = () => {
  return (
    <SvgWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
        <path
          d="M24 6C27.5601 6 31.0402 7.05568 34.0003 9.03355C36.9604 11.0114 39.2675 13.8226 40.6298 17.1117C41.9922 20.4008 42.3487 24.02 41.6541 27.5116C40.9596 31.0033 39.2453 34.2106 36.7279 36.7279C34.2106 39.2453 31.0033 40.9596 27.5116 41.6541C24.02 42.3487 20.4008 41.9922 17.1117 40.6298C13.8226 39.2675 11.0114 36.9603 9.03355 34.0003C7.05568 31.0402 6 27.5601 6 24H9.96C9.96 26.7768 10.7834 29.4913 12.3262 31.8002C13.8689 34.1091 16.0617 35.9086 18.6271 36.9713C21.1926 38.0339 24.0156 38.312 26.7391 37.7702C29.4626 37.2285 31.9642 35.8913 33.9278 33.9278C35.8913 31.9642 37.2285 29.4626 37.7702 26.7391C38.312 24.0156 38.0339 21.1926 36.9713 18.6271C35.9086 16.0617 34.1091 13.8689 31.8002 12.3262C29.4913 10.7834 26.7768 9.96 24 9.96V6Z"
          fill="#27FFBE"
        />
      </svg>
    </SvgWrapper>
  );
};
const turn = keyframes`
 0% {
    transform: rotate(0deg);
 }
 100% {
    transform: rotate(360deg);
 }
`;
const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 54.35px;
  height: 54.35px;
  transform: rotate(0);
  animation: 1s ${turn} linear infinite;
`;
export default ProgressCircle;
