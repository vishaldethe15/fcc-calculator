import Button from "./Button";
import { calcButtons } from "../../data";

const ButtonContainer = ({ handleInput }) => {
  return (
    <div className="btn-container">
      {calcButtons.map((btn) => {
        return <Button key={btn.id} keydata={btn} handleInput={handleInput} />;
      })}
    </div>
  );
};

export default ButtonContainer;
