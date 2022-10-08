import { Fragment, React } from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  return (
    <Fragment>
      {props.todoList.map((item) => {
        return (
          <TodoItem
            todoItem={item}
            key={item.id}
            editTodoHandler={props.editTodoHandler}
            deleteTodoHandler={props.deleteTodoHandler}
            isDoneHandler={props.isDoneHandler}
          ></TodoItem>
        );
      })}
    </Fragment>
  );
};

export default TodoList;
