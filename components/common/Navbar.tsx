import styled from 'styled-components';
import { AiOutlineHome, AiOutlineUser,AiOutlineMenu } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

const NavBar = () => {
  return (
    <Wrapper>
      <nav>
        <button>
          <AiOutlineMenu size="30" color="#aaa" />
        </button>
        <button>
          <AiOutlineHome size="30" color="#ff4d57" />
        </button>
        <button>
          <AiOutlineUser size="30" color="#aaa" />
        </button>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  bottom: 0;
  background-color: #fff;
  max-width: 500px;
  width: 100%;
  height: 70px;
  box-shadow: 0px 0px 5px 0px #ddd;
  nav {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0 5%;
    button {
      padding: 0 10px;
      border: 0;
      background-color: transparent;
    }
  }
`;

export default NavBar;
