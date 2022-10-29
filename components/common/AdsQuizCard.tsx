import styled from 'styled-components';
import {useEffect} from 'react'
const AdsQuizCard = () => {

    useEffect(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Advertise is pushed');
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') console.error('AdvertiseError', e);
      }
    }, []);
    return process.env.NODE_ENV !== 'production' ? (
      <></>
    ) : (
      <QuizCardWrapper>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-format="fluid"
          data-ad-layout-key="-6t+e9+14-5f+as"
          data-ad-client="ca-pub-7873415242511235"
          data-ad-slot="8940715357"
        ></ins>
      </QuizCardWrapper>
    );
};

const QuizCardWrapper = styled.div`
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%);
  transition: all 0.1s ease-in-out;
  border-radius: 12px;
  position: relative;
  margin-bottom: 1rem;
  height:375.25px;
  &:last-child {
    margin: 0;
  }
  &:hover {
    transform: scale(1.025);
  }
  width: 100%;
  display:flex;
  align-items:center;
  justify-content:center;
`;
export default AdsQuizCard;
