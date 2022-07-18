import type { ReactElement } from 'react';
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, HeaderLayout } from 'components/layout';
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
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <HeaderLayout>{page}</HeaderLayout>
    </AppLayout>
  );
};
export default Home;
