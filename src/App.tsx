import React, { useState } from "react";
import "./styles.css";

type TodoListProps = {
  todo: {
    text: string;
    isCompleted: boolean;
  };
  index: number;
  /** function invoked when Complete button is clicked*/
  completeTodo: (index: number) => void;
};

type FormProps = {
  /** function invoked when user submits a task*/
  addTodo: (value: string) => void;
};

function Todo({ todo, index, completeTodo }: TodoListProps): React.ReactNode {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }: FormProps): React.ReactNode {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{" "}
      Enter a task
    </form>
  );
}

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
