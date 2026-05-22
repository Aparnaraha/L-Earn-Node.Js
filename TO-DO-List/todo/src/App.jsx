// IMPORT useState
// useState stores component data

import { useState, useEffect } from "react";
import { styles } from "./style/Style";

// IMPORT AXIOS
// Axios is used for API requests

import axios from "axios";

// MAIN COMPONENT

function App() {
  // ---------------- STATE ----------------

  // STORE todo input text

  // todos = current value
  // setTodos = function to update value

  // [] means initial value is empty array

  const [todos, setTodos] = useState([]);

  // STORE INPUT FIELD VALUE

  const [input, setInput] = useState("");

  // ---------------- useEffect ----------------

  // useEffect runs after component renders

  // WHY WE USE IT HERE?
  // Because we want to fetch todos automatically
  // when page loads

  useEffect(() => {
    // CALL FUNCTION
    getTodos();
  }, []);

  // [] means:
  // Run only ONCE when component loads

  // ---------------- FUNCTIONS ----------------

  // FUNCTION TO GET TODOS

  const getTodos = async () => {
    try {
      // SEND GET REQUEST

      const res = await axios.get("/todos");

      // UPDATE STATE WITH BACKEND DATA

      setTodos(res.data);
    } catch (error) {
      console.log(error);
    }
  };
   
  // FUNCTION TO ADD TODO

  const addTodo = async () => {
    // VALIDATION
    // Prevent empty todo

    if (!input) return;

    try {
      // SEND POST REQUEST

      await axios.post("/todos", {
        text: input,
      });

      // FETCH UPDATED TODOS
      // So UI refreshes automatically

      // setTodos(res.data); // IMPORTANT FIX
      getTodos();

      // CLEAR INPUT FIELD

      setInput("");

    } catch (error) {
      console.log(error);
    }
  };

  // FUNCTION TO DELETE TODO

  const deleteTodo = async (id) => {
    try {
      // SEND DELETE REQUEST

      const res = await axios.delete(`/todos/${id}`);

      // REFRESH TODOS
      // setTodos(res.data);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  // ---------------- UI ----------------

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo App</h1>

      {/* INPUT FIELD */}
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Enter todo"
          value={input}
          className={styles.input}
          onChange={(e) => setInput(e.target.value)}
        />

        {/* BUTTON */}
        <button className={styles.button} onClick={addTodo}>
          Add Todo
        </button>
      </div>

      {/* LOOP THROUGH TODOS */}
      {todos.map((todo) => (
      <div key={todo._id} className={styles.todoCard}> 
        <p>{todo.text}</p>
        <button
          className={styles.deleteBtn}
          onClick={() => deleteTodo(todo._id)} // ✅ Fixed ID target
        >
          Delete
        </button>
      </div>
    ))}
    </div>
  );
}

export default App;
