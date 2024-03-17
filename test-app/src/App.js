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
import customButtonTheme from "./styles/customButtonTheme";
import customTextFieldTheme from "./styles/customTextFieldTheme";
import customContainerTheme from "./styles/customContainerTheme";
import customListItemTheme from "./styles/customListItemTheme";
import customListButtonTheme from "./styles/customListButtonTheme";
import customListTypographyTheme from "./styles/customListTypographyTheme";

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
    updated.sort((a, b) => a.isDone - b.isDone);
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
    <ThemeProvider theme={customContainerTheme}>
      <Container component="main">
        <ThemeProvider theme={customTextFieldTheme}>
          <TextField
            variant="outlined"
            onChange={onChange}
            label="type your task"
            value={inputVal}
          />
        </ThemeProvider>
        <ThemeProvider theme={customButtonTheme}>
          <Button
            size="large"
            variant={isEdited ? "outlined" : "contained"}
            color="primary"
            onClick={handleClick}
            disabled={inputVal ? false : true}
          >
            {isEdited ? "Edit Task" : "Add Task"}
          </Button>
        </ThemeProvider>
        <List>
          {todos.map((todo) => {
            return (
              <>
                <ThemeProvider theme={customListItemTheme}>
                  <ListItem divider="ture">
                    <Checkbox
                      onClick={() => {
                        handleDone(todo.id);
                      }}
                      checked={todo.isDone}
                    />
                    <ThemeProvider theme={customListTypographyTheme}>
                      <Typography style={{ color: todo.isDone ? "green" : "" }}>
                        {todo.val}
                      </Typography>
                    </ThemeProvider>
                    <ThemeProvider theme={customListButtonTheme}>
                      <Button
                        onClick={() => handleEdit(todo.id)}
                        variant="contained"
                        color="info"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(todo.id)}
                        color="error"
                        variant="contained"
                      >
                        delete
                      </Button>
                    </ThemeProvider>
                  </ListItem>
                </ThemeProvider>
              </>
            );
          })}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;
