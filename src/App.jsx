import { useState, useEffect } from "react";
// import Header from "./components/Header";
import TodoList from "./components/TodoList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Add from "./pages/Add";

function App() {
  const [isRefresh, setIsRefresh] = useState(true);
  const [filter] = useState("all");
  // const [searchResults, setSearchResults] = useState([]);
  const [todos, setTodos] = useState([]);

  const setRefresh = (status) => {
    setIsRefresh(status);
  };

  useEffect(() => {
    // Efek pertama kali untuk memuat data todo list
    fetch("http://localhost:4000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted.");
        }
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/add" element={<Add setRefresh={setRefresh} />} />
            <Route
              path="/"
              element={
                <TodoList
                  setRefresh={setRefresh}
                  isRefresh={isRefresh}
                  filter={filter}
                  todos={todos}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
