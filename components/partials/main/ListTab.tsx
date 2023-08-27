import styled from 'styled-components';

interface ListTabProps {
  name: string;
  value: number;
  checked: number;
  onChangeHandler: (value: number) => void;
}

const ListTab = ({ name, value, checked, onChangeHandler }: ListTabProps) => {
  return (
    <Wrapper
      className={value === checked ? 'checked' : ''}
      onClick={() => {
        onChangeHandler(value);
      }}
    >
      {name}
    </Wrapper>
  );
};

const Wrapper = styled.button``;
export default ListTab;
