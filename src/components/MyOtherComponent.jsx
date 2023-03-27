import styled from 'styled-components';
import "../App.css"

const Container = styled.div`
  font-family: ${(props) => props.fontFamily};
  background-color: ${(props) => (props.isActive && 'var(--dark-background-color)')};
`;

const Title = styled.h1`
  font-family: ${(props) => props.fontFamily};
  /* color: ${(props) =>
    props.isActive}; */
`;
const Text = styled.div`
  font-family: ${(props) => props.fontFamily};
`;
const Text2 = styled.div`
  font-family: ${(props) => props.fontFamily};
  color: var(--secondary-text-color);
`;
const Form = styled.form`
`;
const Input = styled.input`
  font-family: ${(props) => props.fontFamily};
`;
const Button = styled.button`
  font-family: ${(props) => props.fontFamily};
  background-color: ${(props) => (props.isActive ? 'var(--dark-background-color)' : 'var(--light-background-color)')};
  color: ${(props) => (props.isActive ? 'var(--dark-text-color)' : 'var(--light-text-color)')};
`;

function MyOtherComponent({font, isDarkMode }) {

  return (
      <Container style={{fontFamily: font }} isActive={isDarkMode}>
        <Text>This is some text in</Text>
        <Text2>This is some text in</Text2>
        <Title>This is some text in</Title>
        <Form style={{fontFamily: font }}>
          <Input style={{fontFamily: font }} placeholder="place your word"/>
        </Form>
        <Button isActive={isDarkMode}>Click me</Button>
      </Container>
  );
}

export default MyOtherComponent;