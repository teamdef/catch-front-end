import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 5rem;
`;
export const NoticeList = styled.div`
  background-color: white;
  margin-top: 40px;
`;

interface noticeProps {
  new: boolean;
}
export const Notice = styled.details<noticeProps>`
  cursor: pointer;
  color: #595959;
  &:nth-last-child(1) {
    border: none;
  }
  #notice {
    padding-bottom: 1rem;
    border-bottom: solid 1px #eee;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::-webkit-details-marker {
      display: none;
    }
    #title-container {
      #title {
        font-size: 1.1rem;
        position: relative;
        &:after {
          ${(props) =>
            props.new &&
            css`
              content: 'N';
              color: #fff;
              background: #ff4d57;
              border-radius: 4px;
              font-size: 6px;
              font-weight: 100;
              margin-left: 6px;
              padding: 1px 5px 1px 4px;
              position: absolute;
              top: 4px;
            `}
        }
      }
      #upload-date {
        color: #888;
        font-weight: 300;
        margin-top: 8px;
        font-size: 0.9rem;
      }
    }
  }
  &[open] {
    #title {
      font-weight: 600;
      color: #595959;
    }
    svg {
      transform: rotate(-180deg);
      transition: ease-in-out 0.25s;
    }
  }
  &:not(&[open]) {
    svg {
      transform: rotate(0deg);
      transition: ease-in-out 0.25s;
    }
  }
  #content {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    font-family: 'Noto Sans Kr';
    font-size: 1rem;
    padding: 1rem;
    background-color: #f4f4f4;
    border: none;
    resize: none;
    width: 100%;
    outline: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
