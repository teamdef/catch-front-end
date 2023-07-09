/* 
    메인페이지에 들어가는 컴포넌트를 관리함.
    현재 폴더명은 임시로 작성하였으며, pages/main 이 될 수 있음.
*/

import styled from 'styled-components';
import Link from 'next/link';

interface props {
  title: string;
  simply: boolean;
  subtitle?: string;
  moreViewUri?: string;
}
const SectionHeader = ({ title, subtitle, moreViewUri, simply }: props) => {
  return (
    <Wrapper simply={simply}>
      <div className="row">
        <div className="title">{title}</div>
        {moreViewUri && (
          <Link href={moreViewUri} passHref>
            <a>
              <img src={'assets/img/rebranding/navigate_next.png'} />
            </a>
          </Link>
        )}
      </div>
      {!simply && <div className="subtitle">{subtitle}</div>}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ simply: boolean }>`
  width: 100%;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: ${({ theme, simply }) => (simply ? theme.colors.blackColors.grey_800 : theme.colors.secondary_500)};
      font-weight: ${({ theme, simply }) => (simply ? theme.fontWeight.bold : theme.fontWeight.extra_bold)};
      font-size: ${({ theme, simply }) => (simply ? '15px' : theme.fontSize.subtitle_2)};
    }
    a {
      ${({ theme }) => theme.mixin.flex()}/* mixin 사용 */
    }
  }
  .subtitle {
    margin-top: 4px;
    color: ${({ theme }) => theme.colors.blackColors.grey_800};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    font-size: ${({ theme }) => theme.fontSize.caption};
  }
`;

export default SectionHeader;
