import Typewriter from 'typewriter-effect';

const Jumbotron = ({ text }: { text: string | string[] }) => (
  <Typewriter
    options={{
      strings: text,
      autoStart: true,
      loop: true,
    }}
  />
);

export default Jumbotron;
