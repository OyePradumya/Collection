import { React,useState } from "react";
import styles from "./TodoInput.module.css";

const TodoEdit = (props) => {
  const [newItem, setNewItem] = useState(props.todoListItem.value);
  const submitHandler = () => {
    const newTodoItem = {
      id: props.todoListItem.id,
      value: newItem,
      isDone: props.todoListItem.isDone,
    };
    props.updateTodoHandler(newTodoItem);
    setNewItem("");
  };
  return (
    <div className={`row ${styles.body}`}>
      <input
        className={`col-8 ${styles.input}`}
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      ></input>
      <button className={`col-3 ${styles.btn}`} onClick={submitHandler}>
        Update
      </button>
    </div>
  );
};

export default TodoEdit;
