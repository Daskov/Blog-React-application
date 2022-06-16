import "./styles.scss";
import { createPostAsync, fetchPostsAsync } from "../../store/action";
import { useAppDispatch } from "../../store";
import { FC, FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Dialog,
  createTheme,
  ThemeProvider,
} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export const Header: FC = () => {
  const dispatch = useAppDispatch();

  const [postValue, setPostValue] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPostAsync({ title: postValue.title, body: postValue.body }));
    setPostValue({
      title: "",
      body: "",
    });
  };

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="sticky">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              ></IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className="link" to="/">
                  Posts
                </Link>
              </Typography>
              <Button onClick={handleClickOpen} color="inherit">
                Add New Post
              </Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <form className="add__form" onSubmit={handleSubmit}>
          <TextField
            value={postValue.title}
            onChange={(e) =>
              setPostValue((state) => ({ ...state, title: e.target.value }))
            }
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
          <TextField
            value={postValue.body}
            onChange={(e) =>
              setPostValue((state) => ({ ...state, body: e.target.value }))
            }
            id="outlined-basic"
            label="Body"
            variant="outlined"
          />
          <Button onClick={handleClose} type="submit">
            Add
          </Button>
        </form>
      </Dialog>
    </>
  );
};
