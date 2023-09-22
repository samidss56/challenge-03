import { useState } from "react";
import PropTypes from "prop-types";
import { Pencil, TrashFill } from "react-bootstrap-icons";

const TodoItem = ({ todo, setRefresh }) => {
  // FITUR EDIT
  const [editText, setEditText] = useState(todo.task);
  // INPUT EDIT
  const [isEditing, setIsEditing] = useState(false);

  // STATUS CHECKLIST
  const updateTodo = () => {
    todo.complete = !todo.complete;

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then(() => {
      console.log("todo updated.");
      setRefresh(true);
    });
  };

  // HAPUS TASK
  const deleteTodo = () => {
    console.log("Id dari delete ", todo.id);
    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "DELETE",
    }).then(() => {
      console.log("todo deleted.");
      setRefresh(true);
      alert("Task Deleted");
    });
  };

  // UPDATE TASK
  const changeTodo = () => {
    const editedTodo = { ...todo, task: editText };

    fetch("http://localhost:8000/todos/" + todo.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTodo),
    }).then(() => {
      console.log("todo updated.");
      setIsEditing(false);
      setRefresh(true);
      alert("Task Edited");
    });
  };

  return (
    <li className={`${todo.complete ? "checked" : ""}`}>
      <div>
        {isEditing ? (
          <div className="task-container">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
            <span className="add-button" onClick={changeTodo}>
              Edit
            </span>
          </div>
        ) : (
          <div className="task-container">
            <div className="task-item" onClick={updateTodo}>
              {todo.task}
            </div>
            <span className="close" onClick={deleteTodo}>
              <TrashFill />
            </span>
            <span className="edit" onClick={() => setIsEditing(true)}>
              <Pencil />
            </span>
          </div>
        )}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default TodoItem;
