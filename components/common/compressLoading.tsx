import styled from 'styled-components'

const CompressLoading = () => {
    return (
        <Background>이미지 압축중... </Background>
    )
}
const Background = styled.div` 
    background-color:rgba(0,0,0,0.15);
    position:absolute;
    top:0;
    right:0;
    width:100vh;
    height:100vh;
    z-index:999;
    display:flex;
    align-items:center;
    justify-content:center;
`


export default CompressLoading();