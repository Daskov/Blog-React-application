import "./styles.scss";
import { setPopup } from "../../store/mainSlice";
import { createPostAsync, fetchPostsAsync } from "../../store/action";
import { useAppDispatch, useAppSelector } from "../../store";
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
  DialogContent,
  DialogContentText,
  DialogActions,
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
  const { popUp } = useAppSelector(({ mainSlice }) => mainSlice);
  const [postValue, setPostValue] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPostAsync({ title: postValue.title, body: postValue.body }));
    setPostValue({
      title: "",
      body: "",
    });
  };

  const handleClose = () => {
    dispatch(setPopup(false));
    setOpen(false);
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
              <Button onClick={() => setOpen(true)} color="inherit">
                Add New Post
              </Button>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form className="add__form" onSubmit={handleSubmit}>
          <TextField
            value={postValue.title}
            onChange={(e) =>
              setPostValue((state) => ({ ...state, title: e.target.value }))
            }
            id="outlined-basic"
            label="Title"
            variant="outlined"
            required
          />
          <TextField
            value={postValue.body}
            onChange={(e) =>
              setPostValue((state) => ({ ...state, body: e.target.value }))
            }
            id="outlined-basic"
            label="Body"
            variant="outlined"
            required
          />
          <div className="buttons">
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Dialog>

      <Dialog
        open={popUp}
        onClose={() => dispatch(setPopup(false))}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You have successfully added a new post
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
