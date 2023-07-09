import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import Link from 'next/link';
const Banner = () => {

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
        loop={true}
      >
        <SwiperSlide>
          <Link href="/quiz/create" passHref>
            <a>
              <BannerContent>
                <img src={'/assets/img/rebranding/quiz-create-banner-1.png'} />
              </BannerContent>
            </a>
          </Link>
        </SwiperSlide>
        <SwiperSlide>
          <Link href="/quiz/create" passHref>
            <a>
              <BannerContent>
                <img src={'/assets/img/rebranding/quiz-create-banner-2.png'} />
              </BannerContent>
            </a>
          </Link>
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
  img {
    width: 100%;
    height: auto;
  }
`;
export default Banner;
