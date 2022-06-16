import { PostComment, PostItem } from "./types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axios from "axios";

export const fetchPostsAsync = createAsyncThunk(
  "mainSlice/fetchPostsAsync",
  async () => {
    try {
      const { data } = await axios.get(
        "https://bloggy-api.herokuapp.com/posts"
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const createPostAsync = createAsyncThunk(
  "mainSlice/createPostAsync",
  async ({ title, body }: Omit<PostItem, "comments">, { dispatch }) => {
    try {
      await axios.post("https://bloggy-api.herokuapp.com/posts", {
        title,
        body,
      });
      dispatch(fetchPostsAsync());
    } catch (e) {
      console.log(e);
    }
  }
);

export const getPostToEditAsync = createAsyncThunk(
  "mainSlice/getPostToEditAsync",
  async (id: string) => {
    try {
      const { data } = await axios.get(`
        https://bloggy-api.herokuapp.com/posts/${id}
      `);
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const saveEditedPostAsync = createAsyncThunk(
  "mainSlice/saveEditedPostAsync",
  async (
    { id, title, body }: { id: string; title: string; body: string },
    { dispatch }
  ) => {
    try {
      await axios.put(`https://bloggy-api.herokuapp.com/posts/${id}`, {
        title,
        body,
      });
      dispatch(getPostToEditAsync(id));
    } catch (e) {
      console.log(e);
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  "mainSlice/deletePostAsync",
  async ({ id, navigate }: { id: string; navigate: NavigateFunction }) => {
    try {
      await axios.delete(`https://bloggy-api.herokuapp.com/posts/${id}`);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
);

export const fetchPostComments = createAsyncThunk(
  "mainSlice/fetchPostComments",
  async (id: string | number) => {
    try {
      const { data } = await axios(
        `https://bloggy-api.herokuapp.com/posts/${id}?_embed=comments`
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const createCommentAsync = createAsyncThunk(
  "mainSlice/createСommentAsync",
  async ({ postId, body }: PostComment, { dispatch }) => {
    try {
      await axios.post("https://bloggy-api.herokuapp.com/comments", {
        body,
        postId,
      });
      dispatch(fetchPostComments(postId));
    } catch (e) {
      console.log(e);
    }
  }
);
