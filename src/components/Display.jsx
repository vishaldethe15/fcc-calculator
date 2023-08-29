const Display = ({ input, output }) => (
  <section id="display-screen">
    <span className="value" id="output">
      {output}
    </span>
    <span className="value" id="display">
      {input}
    </span>
  </section>
);
export default Display;
