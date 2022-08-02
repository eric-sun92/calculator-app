import { ACTIONS } from "./App";

const DigitButton = ({ digit, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.addDigit,
          payload: {
            digit: digit,
          },
        })
      }
    >
      {digit}
    </button>
  );
};

export default DigitButton;
