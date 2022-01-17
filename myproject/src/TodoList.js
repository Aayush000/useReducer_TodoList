import React, { useState } from "react";
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaTrash } from "react-icons/fa";

const TodoList = () => {
  const initialData = JSON.parse(localStorage.getItem("todos"));
  const [todoList, setTodoList] = useState([...initialData]);
  const [text, setText] = useState("");

  //Format
  //   [
  //       {
  //           data: "todo",
  //           date: "current date",
  //           isCompleted: "true/false"
  //       }
  //   ]
  const addTodo = () => {
    const newTodo = [
      ...todoList, // It stores the previous data
      {
        data: text,
        date: new Date().toLocaleString().split(",")[0],
        isCompleted: false,
      },
    ];

    setText("");
    setTodoList(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const toggleTodoCompletion = (idx) => {
    const newTodo = todoList.map((todo, index) =>
      index === idx ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    setTodoList(newTodo);
    localStorage.setItem("todos", JSON.stringify(newTodo));
  };

  const deleteTodo = (idx) => {
    const response = window.confirm("Do you want to delete?");
    if (response) {
      const newTodo = todoList.filter((_, index) =>
        index === idx ? false : true
      );
      setTodoList(newTodo);
      localStorage.setItem("todos", JSON.stringify(newTodo));
    }
  };

  return (
    <Container className="mt-3 text-center">
      <h3>Todo List App</h3>
      <Form.Control
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && addTodo()}
      />

      <br />

      <Button onClick={addTodo}>
        {" "}
        <FaPlus />
        <lebel className="ms-2">Add</lebel>{" "}
      </Button>

      <br />
      <br />

      {todoList.length > 0
        ? todoList.map((todo, index) => {
            return (
              <Row>
                <Col xs="10">
                  <Alert
                    variant={todo.isCompleted ? "danger" : "primary"}
                    className="text-start"
                    style={{
                      cursor: "pointer",
                      textDecoration: todo.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                    onClick={() => toggleTodoCompletion(index)}
                  >
                    <h3>{todo.data}</h3>
                    <small>{todo.date}</small>
                  </Alert>
                </Col>

                <Col className="mt-4">
                  <FaTrash
                    size="40"
                    color="red"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => deleteTodo(index)}
                  />
                </Col>
              </Row>
            );
          })
        : "No todos"}
    </Container>
  );
};

export default TodoList;
