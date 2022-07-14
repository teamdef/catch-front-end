// 임시 헤더 제작
import styled from 'styled-components';

const Header = () => {
  return (
    <HeaderContentWrapper>
          <HeaderContent>
              <Logo>CatchMe</Logo>
              <UserName>@@@님</UserName>
      </HeaderContent>
    </HeaderContentWrapper>
  );
};

const DropDownMyMenu = () => {
  return <></>;
};

// header 
const HeaderContentWrapper = styled.div`
  display: flex;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  height: 60px;
  background-color: white;
  border-bottom:solid 1px #d6d6d6;
`;
const HeaderContent = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  align-items:center;
`;
const Logo = styled.div`
  font-size: 20px;
  font-weight:bold;
`;
const UserName = styled.div` 
    font-size:18px;
`

// drop down my menu
const MenuContainer = styled.div` 
  
`
export default Header;
