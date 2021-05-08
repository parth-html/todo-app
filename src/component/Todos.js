import React, { useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Todo from "./Todo";
import fbpopup from "../sound/fbpopup.mp3";
import popup from "../sound/popup.mp3";
import ipplemsg from "../sound/ipplemsg.mp3";

const Todos = () => {
  const [input, setinput] = useState("");
  if (localStorage.getItem("todoItems") === null) {
    localStorage.setItem("todoItems", JSON.stringify([]));
  }

  var todos = JSON.parse(localStorage.getItem("todoItems"));

  const addTodo = (e) => {
    if (input !== "") {
      if (JSON.parse(localStorage.getItem("todoItems")).length <= 4) {
        let audio = new Audio(fbpopup);
        audio.play();
        todos.push({ title: input });
        localStorage.setItem("todoItems", JSON.stringify(todos));
        settodoItem(todos);
        setinput("");
      } else {
        let audio = new Audio(ipplemsg);
        audio.play();
        setinput("");
        handleClick();
      }
    }
  };

  var el = document.getElementById("todoinp");

  if (el) {
    el.addEventListener("keyup", (e) => {
      e.preventDefault();
      if (e.key === "Enter") {
        document.getElementById("todobtn").click();
      }
    });
  }

  const removeTodo = (index) => {
    let audio = new Audio(popup);
    audio.play();
    let newTodos = todos.filter((todo) => {
      return todo.title !== index;
    });
    settodoItem(newTodos);
    localStorage.setItem("todoItems", JSON.stringify(newTodos));
  };

  const [todoItem, settodoItem] = useState(todos);
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex items-center">
      <div className="sm:w-1/2 lg:w-1/3 w-11/12 bg-yellow-400 h-3/4 mx-auto rounded-lg overflow-hidden">
        <div className="h-20 text-black flex items-center rounded-lg">
          <h1 className="mx-auto font-medium  text-xl">My Todos</h1>
        </div>
        <div className="h-20 flex items-center">
          <div className="bg-white w-3/4 mx-auto flex items-center shadow-center-2xl rounded-lg relative">
            <input
              type="text"
              className="outline-none w-full font-semibold pr-16 m-3"
              placeholder="Add todo Item"
              id="todoinp"
              name="todo"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
            />
            <Snackbar
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Maximum 5 Todos can be added"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            <button
              type="button"
              id="todobtn"
              className="bg-blue-400 focus:outline-none hover:bg-blue-500 text-white font-bold py-1 px-4 absolute right-2 rounded"
              onClick={addTodo}
            >
              Add
            </button>
          </div>
        </div>
        {todoItem.map((todo, index) => {
          return <Todo todos={todo} key={index + 1} removeTodo={removeTodo} />;
        })}
      </div>
    </div>
  );
};

export default Todos;
