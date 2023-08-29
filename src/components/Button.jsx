const Button = ({ keydata: { id, value }, handleInput }) => (
  <button className="btn" id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

export default Button;
