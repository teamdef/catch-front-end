import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
import { Button } from 'components/common';
import styled from "styled-components"
const Home: NextPageWithLayout = () => {
  return (
    <div style={{
      backgroundColor:'#ccc',
      height: '70vh'
    }}>
      <div style={{
        position:'absolute',
        left: '50%',
        transform:'translate(-50%,-35%)',
        borderRadius:'30px',
        width: '75%',
        height: '40%',
        backgroundColor: '#fff'
      }}>

      </div>
    </div>
    );
};

const Background = styled.div`
  background-color: #f5f5f5;
`;
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Home;
