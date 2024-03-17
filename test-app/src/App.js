import { useState } from "react";
import {
  List,
  Button,
  TextField,
  ListItem,
  Checkbox,
  Typography,
  Container,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "./styles/customTheme";

function App() {
  const [inputVal, setInputVal] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [editedId, setEditedId] = useState(null);

  const onChange = (e) => {
    setInputVal(e.target.value);
  };

  const handleClick = () => {
    if (!isEdited) {
      setTodos([
        ...todos,
        { val: inputVal, isDone: false, id: new Date().getTime() },
      ]);
    } else {
      setTodos([...todos, { val: inputVal, isDone: false, id: editedId }]);
    }
    setInputVal("");
    setIsEdited(false);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id) => {
    const updated = todos.map((todo) => {
      if (todo.id === id) {
        todo.isDone = !todo.isDone;
      }
      return todo;
    });
    setTodos(updated);
  };

  const handleEdit = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    const editVal = todos.find((todo) => todo.id === id);
    setEditedId(editVal.id);
    setInputVal(editVal.val);
    setTodos(newTodos);
    setIsEdited(true);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Container component="main">
        <TextField
          variant="outlined"
          onChange={onChange}
          label="type your task"
          value={inputVal}
        />
        <Button
          size="large"
          variant={isEdited ? "outlined" : "contained"}
          color="primary"
          onClick={handleClick}
          disabled={inputVal ? false : true}
        >
          {isEdited ? "Edit Task" : "Add Task"}
        </Button>
        <List>
          {todos.map((todo) => {
            return (
              <>
                <ListItem divider="bool">
                  <Checkbox
                    onClick={() => handleDone(todo.id)}
                    checked={todo.isDone}
                  />
                  <Typography
                    style={{ color: todo.isDone ? "green" : "" }}
                    key={todo.id}
                  >
                    {todo.val}
                  </Typography>
                  <Button
                    onClick={() => handleEdit(todo.id)}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDelete(todo.id)}
                    color="secondary"
                    variant="contained"
                  >
                    delete
                  </Button>
                </ListItem>
              </>
            );
          })}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;
