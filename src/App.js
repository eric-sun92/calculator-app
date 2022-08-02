import { useReducer } from "react";
import DigitButton from "./DigitButton.js";
import Operator from "./Operator.js";

export const ACTIONS = {
  addDigit: "add-digit",
  chooseOperator: "chooseOperator",
  clear: "clear",
  equals: "equals",
  delete: "delete",
};

function evaluate({ previous, current, operation }) {
  let evaluation;
  switch (operation) {
    case "+":
      evaluation = parseFloat(previous) + parseFloat(current);
      break;
    case "-":
      evaluation = parseFloat(previous) - parseFloat(current);
      break;
    case "*":
      evaluation = parseFloat(previous) * parseFloat(current);
      break;
    case "÷":
      evaluation = parseFloat(previous) / parseFloat(current);
      break;
    default:
      return;
  }
  return evaluation.toString();
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.addDigit:
      if (state.overWrite) {
        return {
          ...state,
          current: payload.digit,
          overWrite: false,
        };
      }

      if (payload.digit === "0" && state.current === "0") return state;
      if (state.current && payload.digit === "." && state.current.includes("."))
        return state;

      return {
        ...state,
        current: `${state.current || ""}${payload.digit}`,
      };
    case ACTIONS.chooseOperator:
      if (state.current == null && state.previous == null) return state;
      if (state.operation != null && state.current == null) {
        return {
          ...state,
          operation: payload.operator,
        };
      }
      if (state.operation != null) {
        return {
          ...state,
          previous: evaluate(state),
          current: null,
          operation: payload.operator,
        };
      }
      return {
        ...state,
        previous: state.current,
        operation: payload.operator,
        current: null,
      };

    case ACTIONS.clear:
      return {};

    case ACTIONS.equals:
      return {
        current: evaluate(state),
        previous: null,
        operation: null,
        overWrite: true,
      };
    case ACTIONS.delete:
      if (state.overWrite) {
        return {
          ...state,
          current: null,
          overWrite: false,
        };
      }
      if (state.current == null) return state;
      if (state.current.length === 1) {
        return {
          ...state,
          current: null,
        };
      }

      return {
        ...state,
        current: state.current.slice(0, -1),
      };
    default:
      return state;
  }
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ previous, current, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="calculator">
      <div className="result">
        <div className="previous">
          {formatOperand(previous)} {operation}
        </div>
        <div className="current">{formatOperand(current)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => {
          dispatch({
            type: ACTIONS.clear,
          });
        }}
      >
        AC
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.delete,
          })
        }
      >
        DEL
      </button>
      <Operator operator="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <Operator operator="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <Operator operator="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <Operator operator="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() =>
          dispatch({
            type: ACTIONS.equals,
          })
        }
      >
        =
      </button>
    </div>
  );
}

export default App;
