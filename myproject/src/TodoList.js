import React, { useState, useReducer } from "react";
import { Form, Container, Button, Alert, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FaPlus, FaTrash } from "react-icons/fa";
import TODO_ACTIONS from "./actions/todoAction";
import todoReducer from "./reducers/todoReducers";

const TodoList = () => {
  const initialData = JSON.parse(localStorage.getItem("todos"));
  const [text, setText] = useState("");

  const [state, dispatch] = useReducer(todoReducer, [...initialData]);

  return (
    <Container className="mt-3 text-center">
      <h3>Todo List App</h3>
      <Form.Control
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter" && text.length > 0) {
            dispatch({
              type: TODO_ACTIONS.ADD_TODO,
              // payloads: { text: text, setText: setText }, (If key an value are same, no need to repeat)
              payloads: { text, setText },
            });
          }
        }}
      />

      <br />

      <Button
        onClick={() => {
          if (text.length > 0) {
            // addTodo();
            dispatch({
              type: TODO_ACTIONS.ADD_TODO,
              payloads: { text, setText },
            });
          }
        }}
      >
        {" "}
        <FaPlus />
        <lebel className="ms-2">Add</lebel>{" "}
      </Button>

      <br />
      <br />

      {state.length > 0
        ? state.map((todo, index) => {
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
                    onClick={() =>
                      dispatch({
                        type: TODO_ACTIONS.TOGGLE_TODO,
                        // payloads: { index: index },
                        payloads: { index },
                      })
                    }
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
                    onClick={() =>
                      dispatch({
                        type: TODO_ACTIONS.DELETE_TODO,
                        // payloads: { index: index },
                        payloads: { index },
                      })
                    }
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
