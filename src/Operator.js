import { ACTIONS } from "./App.js";

const Operator = ({ dispatch, operator }) => {
  return (
    <button
      onClick={() =>
        dispatch({
          type: ACTIONS.chooseOperator,
          payload: {
            operator: operator,
          },
        })
      }
    >
      {operator}
    </button>
  );
};

export default Operator;
