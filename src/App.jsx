import Display from "./components/Display";
import ButtonContainer from "./components/ButtonContainer";
import { operators, numbers } from "../data";
import { useState, useEffect } from "react";

const App = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [calcData, setCalcData] = useState("");

  const handleSubmit = () => {
    const total = eval(calcData);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalcData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setOutput("");
    setCalcData(``);
  };

  const handleNumbers = (value) => {
    if (!calcData.length) {
      setInput(`${value}`);
      setCalcData(`${value}`);
    } else {
      if (value === 0 && (calcData === "0" || input === "0")) {
        setCalcData(`${calcData}`);
      } else {
        const lastChar = calcData.charAt(calcData.length - 1);
        const isLastCharOperator = operators.includes(lastChar);

        setInput(isLastCharOperator ? `${value}` : `${input}${value}`);
        setCalcData(`${calcData}${value}`);
      }
    }
  };

  const handleDecimal = () => {
    const lastChar = calcData.charAt(calcData.length - 1);
    if (!calcData.length) {
      setInput("0.");
      setCalcData("0.");
    } else {
      if (operators.includes(lastChar)) {
        setInput("0.");
        setCalcData(`${calcData} 0.`);
      } else {
        setInput(
          lastChar === "." || input.includes(".") ? `${input}` : `${input}.`
        );
      }

      const formattedValue =
        lastChar === "." || input.includes(".")
          ? `${calcData}`
          : `${calcData}.`;

      setCalcData(formattedValue);
    }
  };

  const handleOperators = (value) => {
    if (calcData.length) {
      setInput(`${value}`);
      const beforeLastChat = calcData.charAt(calcData.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = calcData.charAt(calcData.length - 1);

      const lastChatIsOperator =
        operators.includes(lastChat) || lastChat === "*";

      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        (beforeLastChatIsOperator && lastChatIsOperator)
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${calcData.substring(
            0,
            calcData.length - 2
          )}${value}`;
          setCalcData(updatedValue);
        } else {
          setCalcData(
            `${calcData.substring(0, calcData.length - 1)}${validOp}`
          );
        }
      } else {
        setCalcData(`${calcData}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((operator) => operator === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        handleDecimal();
        break;
      case operator:
        handleOperators(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setOutput(calcData);
  }, [calcData]);

  return (
    <div className="wrapper">
      <main className="calc-container">
        <Display input={input} output={output} />
        <ButtonContainer handleInput={handleInput} />
      </main>
    </div>
  );
};

export default App;
