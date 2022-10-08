import React, { Fragment, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoEdit from "./components/TodoEdit";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editingMode, setEditingMode] = useState(null);

  const addTodoHandler = (newTodoItem) => {
    setTodoList((prev) => {
      return [
        ...prev,
        {
          id: prev.length,
          value: newTodoItem,
          isDone: false,
        },
      ];
    });
  };

  const deleteTodoHandler = (id) => {
    const newItems = todoList.filter((item) => item.id !== id);
    setTodoList(newItems);
  };

  const editTodoHandler = (id) => {
    setEditingMode(id);
  };

  const updateTodoHandler = (updatedItem) => {
    const newItems = todoList.map((item) => {
      return item.id === updatedItem.id ? updatedItem : item;
    });
    setTodoList(newItems);
    setEditingMode(null);
  };

  const isDoneHandler = (id) => {
    const newItems = todoList.map((item) => {
      return item.id === id ? { ...item, isDone: !item.isDone } : item;
    });
    setTodoList(newItems);
  };
  return (
    <Fragment>
      {editingMode !== null ? (
        <TodoEdit
          todoListItem={todoList[editingMode]}
          updateTodoHandler={updateTodoHandler}
        ></TodoEdit>
      ) : (
        <TodoInput addTodoHandler={addTodoHandler}></TodoInput>
      )}

      <TodoList
        todoList={todoList}
        deleteTodoHandler={deleteTodoHandler}
        editTodoHandler={editTodoHandler}
        isDoneHandler={isDoneHandler}
      ></TodoList>
    </Fragment>
  );
}

export default App;
