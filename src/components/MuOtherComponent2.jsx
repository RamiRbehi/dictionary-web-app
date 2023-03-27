import styled from 'styled-components';

const Paragraph = styled.p`
  font-family: ${(props) => props.fontType};
`;

function MuOtherComponent2({ fontType }) {
    return (
    <div>
        <h1 style={{ fontFamily: fontType }}>Heading 1</h1>
        <h2 style={{ fontFamily: fontType }}>Heading 2</h2>
        <Paragraph fontType={fontType}>Example text with {fontType} font</Paragraph>
    </div>
    );
  }

  export default MuOtherComponent2;