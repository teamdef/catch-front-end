import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Router from 'next/router';

const Banner = () => {
  const { isLoggedin } = useSelector((state: RootState) => state.user);
  const moveLogin = () => {
    Router.push('/member/login');
  };
  const moveCreate = () => {
    Router.push('/quiz/create');
  };
  return (
    <Wrapper>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 250,
          disableOnInteraction: false,
        }}
        modules={[Pagination]}
        loop
      >
        <SwiperSlide>
          <BannerContent onClick={isLoggedin ? moveCreate : moveLogin}>
            <img src="/assets/img/rebranding/quiz-create-banner-1.png" alt="배너이미지" />
          </BannerContent>
        </SwiperSlide>
        <SwiperSlide>
          <BannerContent onClick={isLoggedin ? moveCreate : moveLogin}>
            <img src="/assets/img/rebranding/quiz-create-banner-2.png" alt="배너이미지" />
          </BannerContent>
        </SwiperSlide>
      </Swiper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .swiper-wrapper {
    padding-bottom: 8px; /* 2rem -> 36px 변경*/
  }
  .swiper-pagination {
    position: relative;
    .swiper-pagination-bullet {
      width: 8px;
      height: 8px;
      background-color: #d9d9d9;
    }
    .swiper-pagination-bullet-active {
      background-color: ${({ theme }) => theme.colors.blackColors.grey_900};
      width: 12px;
      border-radius: 5px;
      transition: ease-in-out 0.2s;
    }
  }
`;
const BannerContent = styled.div`
  cursor: pointer;
  img {
    width: 100%;
    height: auto;
  }
`;
export default Banner;
