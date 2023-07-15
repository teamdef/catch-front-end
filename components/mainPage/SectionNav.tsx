import { useState } from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';

function SectionNav() {
  const [checked, setChecked] = useState<number>(1);

  const onChangeHandler = (_value: number) => {
    setChecked(_value);
  };
  return (
    <NavBox>
      <NavItem name="최신순" value={1} checked={checked} onChangeHandler={onChangeHandler} />
      <NavItem name="인기순" value={2} checked={checked} onChangeHandler={onChangeHandler} />
      <NavItem name="댓글순" value={3} checked={checked} onChangeHandler={onChangeHandler} />
    </NavBox>
  );
}

const NavBox = styled.div`
  display: flex;
  justify-content: center;
`;
export default SectionNav;
