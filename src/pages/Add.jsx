import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Add = ({ setRefresh }) => {
  const [task, setTask] = useState("");
  const navigate = useNavigate();

  const addTodo = () => {
    // Logika penambahan tugas
    const newTodo = { task, complete: false };

    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).then(() => {
      setTask("");
      setRefresh(true);
      navigate("/");
      alert("New Task Added");
    });
  };

  return (
    <div id="todo-header" className="add">
      <h1>Add Data</h1>
      <input
        type="text"
        placeholder="Add Data..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <span className="add-button" onClick={addTodo}>
        Add
      </span>
    </div>
  );
};

Add.propTypes = {
  setRefresh: PropTypes.func.isRequired,
};

export default Add;
