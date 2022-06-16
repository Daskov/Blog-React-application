import "./styles.scss";
import {
  createCommentAsync,
  deletePostAsync,
  fetchPostComments,
  getPostToEditAsync,
  saveEditedPostAsync,
} from "../../store/action";
import { useAppDispatch, useAppSelector } from "../../store";
import { PostItem } from "../../store/types";
import React, { FC, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField, Dialog, DialogContent } from "@mui/material";

const PostDetails: FC = () => {
  const [open, setOpen] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [values, setValues] = useState<Omit<PostItem, "id" | "comments">>({
    title: "",
    body: "",
  });
  const { postToEdit, comments } = useAppSelector(({ mainSlice }) => mainSlice);
  const dispatch = useAppDispatch();
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveEditedPostAsync({ ...values, id }));
    dispatch(getPostToEditAsync(id));
  };

  const handleSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createCommentAsync({ body: commentValue, postId: Number(id) }));
    setCommentValue("");
  };

  useEffect(() => {
    dispatch(getPostToEditAsync(id));
    dispatch(fetchPostComments(id));
  }, []);

  useEffect(() => {
    if (postToEdit)
      setValues({ title: postToEdit.title, body: postToEdit.body });
  }, [postToEdit]);

  if (!comments) {
    return <h1 className="loading">Loading...</h1>;
  }

  if (!postToEdit) {
    return <h1 className="loading">Loading...</h1>;
  }
  return (
    <>
      <div className="post__inf">
        <h3>{postToEdit.title}</h3>
        <p>{postToEdit.body}</p>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="warning"
        >
          Edit
        </Button>
        <Button
          onClick={() => dispatch(deletePostAsync({ id, navigate }))}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </div>

      <form className="comment__form" onSubmit={handleSubmitComment}>
        <TextField
          value={commentValue}
          onChange={(e) => setCommentValue(e.target.value)}
          label="Title"
          variant="outlined"
          multiline
          rows={5}
        />
        <Button type="submit">Add</Button>
      </form>

      <div className="comments__block">
        <h2>Comments</h2>
        {comments.map((item) => (
          <div key={item.id} className="comment">
            <p>{item.body}</p>
          </div>
        ))}
      </div>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent>
          <form className="edit__form" onSubmit={handleSubmit}>
            <TextField
              value={values.title}
              onChange={(e) =>
                setValues((state) => ({ ...state, title: e.target.value }))
              }
              label="Title"
              variant="outlined"
            />
            <TextField
              value={values.body}
              onChange={(e) =>
                setValues((state) => ({ ...state, body: e.target.value }))
              }
              id="outlined-basic"
              label="Body"
              variant="outlined"
            />
            <div className="actions">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button
                onClick={() => setOpen(false)}
                type="submit"
                variant="contained"
              >
                Edit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDetails;
