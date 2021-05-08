import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

const Todo = ({ todos, removeTodo }) => {
  const childFun = (e) => {
    removeTodo(e.target.id);
  };
  return (
    <div>
      <div className="bg-opacity-20 hover:bg-opacity-30 bg-white mt-5 w-11/12 p-3 rounded-md text-black mx-auto relative">
        {todos.title}
        <Tooltip title="Remove" aria-label="Remove">
          <button
            className="bg-transparent text-black focus:outline-none absolute right-3"
            id={todos.title}
            onClick={childFun}
          >
            &#x2715;
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Todo;
