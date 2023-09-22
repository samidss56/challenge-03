import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const TodoList = ({ isRefresh, setRefresh }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add");
  };

  useEffect(() => {
    if (isRefresh) {
      fetch("http://localhost:8000/todos")
        .then((res) => res.json())
        .then((data) => {
          setRefresh(false);
          setTodos(data);
        })
        .catch((err) => {
          setRefresh(false);
          if (err.name === "AbortError") {
            console.log("fetch aborted.");
          }
        });
    }
  }, [isRefresh, setRefresh]);

  const searchHandler = () => {
    if (query.length === 0) {
      setQueryResults([]);
      return;
    }

    setQueryResults(
      todos.filter((todo) =>
        todo.task.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const results = queryResults.length !== 0 ? queryResults : todos;

  const filteredTodos =
    filter === "all"
      ? results
      : filter === "done"
      ? results.filter((todo) => todo.complete === true)
      : filter === "todo" && results.filter((todo) => todo.complete === false);

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  return (
    <>
      <div className="filter-and-search">
        <h1>Todo App</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search Here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" onClick={searchHandler}>
            Search
          </button>
        </div>
        <div className="filter-buttons ">
          <button className="add-button" onClick={handleAddClick}>
            Add
          </button>
          <button className="all-button" onClick={() => handleFilter("all")}>
            All
          </button>
          <button className="done-button" onClick={() => handleFilter("done")}>
            Done
          </button>
          <button className="todo-button" onClick={() => handleFilter("todo")}>
            Todo
          </button>
        </div>
      </div>
      <ul id="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem todo={todo} setRefresh={setRefresh} key={todo.id} />
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  isRefresh: PropTypes.bool.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default TodoList;
