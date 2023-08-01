import styled from 'styled-components';

interface NavItemProps {
  name: string;
  value: number;
  checked: number;
  onChangeHandler: (value: number) => void;
}

const NavItem = ({ name, value, checked, onChangeHandler }: NavItemProps) => {
  return (
    <NavButton
      className={value === checked ? 'checked' : ''}
      onClick={() => {
        onChangeHandler(value);
      }}
    >
      {name}
    </NavButton>
  );
};

const NavButton = styled.button`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  padding: 13px 0;
  border: none;
  background-color: transparent;
  border-bottom: 3px solid #efefef;
  cursor: pointer;
  &.checked {
    border-color: #3b27ff;
    transition: 0.3s;
    color: #3b27ff;
  }
`;
export default NavItem;
