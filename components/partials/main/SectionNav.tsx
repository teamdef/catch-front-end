import { useState } from 'react';
import styled from 'styled-components';
import NavItem from './NavItem';

interface NavData {
  name: string;
  value: number;
}
function SectionNav() {
  const [checked, setChecked] = useState<number>(1);

  const onChangeHandler = (_value: number) => {
    setChecked(_value);
  };

  const navDataList: NavData[] = [
    { name: '최신순', value: 1 },
    { name: '인기순', value: 2 },
    { name: '댓글순', value: 3 },
  ];
  return (
    <NavBox>
      {navDataList.map((item, index) => (
        <NavItem key={index} name={item.name} value={item.value} checked={checked} onChangeHandler={onChangeHandler} />
      ))}
    </NavBox>
  );
}

const NavBox = styled.div`
  display: flex;
  justify-content: center;
`;
export default SectionNav;
