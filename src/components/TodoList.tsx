import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../app/store.ts";
import { addTodo, removeTodo } from "../features/todos/todoActions";
import { useState } from "react";

const TodoList: React.FC = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos);
  const emojiMap: { [key: string]: string } = {
    eat: "🍔",
    sleep: "😴",
    code: "💻",
  };

  const handleAddTodo = () => {
    const mappedText = emojiMap[todoText.toLowerCase()] || todoText;

    if (mappedText.trim()) {
      dispatch(addTodo(mappedText));
      setTodoText("");
    }
  };

  const handlerRemoveTodo = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <div>
      <em>Made with Redux Toolkit</em>
      <h1>Emoji Todo List</h1>
      <input
        type="text"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Type an emoji or text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAddTodo();
          }
        }}
      />

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} onClick={() => handlerRemoveTodo(todo.id)}>
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
