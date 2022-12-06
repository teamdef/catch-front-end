import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 5rem;
`;
export const NoticeList = styled.div`
  background-color: white;
  border-radius: 4px;
  margin-top: 1.5rem;
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
  padding: 1rem 1rem 0 1rem;
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
        font-size: 1.2rem;
        position: relative;
        &:after {
          ${(props) =>
            props.new &&
            css`
              content: 'N';
              color: #fff;
              background: #ff4d57;
              border-radius: 6px;
              font-size: 10px;
              font-weight: 100;
              margin-left: 6px;
              padding: 2px 5px 2px 5px;
              position: absolute;
              top: 5px;
            `}
        }
      }
      #upload-date {
        color: #888;
        font-weight: 300;
        margin-top: 8px;
        font-size:1rem;
      }
    }
  }
  &[open] {
    #title {
      font-weight: bold;
      color: #000;
    }
    svg {
      transform: rotate(180deg);
    }
  }
  #content {
    font-size: 14px;
    padding: 1rem;
    background-color: #f8f8f8;
    border: none;
    resize: none;
    width: 100%;
    outline: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
