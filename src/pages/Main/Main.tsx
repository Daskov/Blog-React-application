import "./styles.scss";
import { setPopup } from "../../store/mainSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPostsAsync } from "../../store/action";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { posts, popUp } = useAppSelector(({ mainSlice }) => mainSlice);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, []);
  return (
    <>
      <div className="container">
        <div className="content__block">
          {posts.map((item) => (
            <div key={item.id} className="post__block">
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <Link to={`/post/${item.id}`}>Details...</Link>
            </div>
          ))}

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
              <Button onClick={() => dispatch(setPopup(false))} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </>
  );
};
