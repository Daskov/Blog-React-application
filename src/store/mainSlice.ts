import {
  createCommentAsync,
  createPostAsync,
  deletePostAsync,
  fetchPostComments,
  fetchPostsAsync,
  getPostToEditAsync,
  saveEditedPostAsync,
} from "./action";
import { MainState } from "./types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MainState = {
  posts: [],
  popUp: false,
  postToEdit: null,
  deletedPopup: false,
  comments: null,
  commentPopup: false,
};

export const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    setPopup: (state, { payload }) => {
      state.popUp = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPostsAsync.fulfilled, (state, { payload }) => {
      state.posts = payload;
    });
    builder.addCase(createPostAsync.fulfilled, (state, { payload }) => {
      state.popUp = true;
    });
    builder.addCase(getPostToEditAsync.fulfilled, (state, { payload }) => {
      state.postToEdit = payload;
    });
    builder.addCase(saveEditedPostAsync.fulfilled, (state, { payload }) => {
      state.commentPopup = true;
    });
    builder.addCase(deletePostAsync.fulfilled, (state, { payload }) => {
      state.deletedPopup = true;
    });
    builder.addCase(fetchPostComments.fulfilled, (state, { payload }) => {
      state.comments = payload.comments;
    });
    builder.addCase(createCommentAsync.fulfilled, (state, { payload }) => {
      state.commentPopup = true;
    });
  },
});

export const { setPopup } = mainSlice.actions;

export default mainSlice.reducer;
