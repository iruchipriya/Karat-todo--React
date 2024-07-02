import React, { useEffect, useState } from 'react';
import './index.css';

const fetchTodos = async () => {
  const response = await fetch('https://dummyjson.com/todos?limit=10&skip=80');
  const data = await response.json();
  return data.todos;
};

const TodoList = () => {
  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const todosData = await fetchTodos();
        const organizedTodos = organizeTodosByUser(todosData);
        setTodos(organizedTodos);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    getTodos();
  }, []);

  const organizeTodosByUser = (todos) => {
    const userTodos = {};
    todos.forEach((todo) => {
      if (!userTodos[todo.userId]) {
        userTodos[todo.userId] = [];
      }
      userTodos[todo.userId].push(todo);
    });
    return userTodos;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading todos: {error.message}</p>;

  return (
    <div className="container">
      {Object.keys(todos).map((userId) => (
        <div key={userId} className="user-block">
          <h2 className="user-title">User ID: {userId}</h2>
          <ul>
            {todos[userId].map((todo) => (
              <li key={todo.id} className="todo-item">
                {todo.todo}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
