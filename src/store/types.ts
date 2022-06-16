export interface PostComment {
  postId: number;
  body: string;
  id?: number;
}

export interface PostItem {
  title: string;
  body: string;
  id?: number | string;
}

export interface MainState {
  posts: PostItem[];
  popUp: boolean;
  postToEdit: PostItem | null;
  deletedPopup: boolean;
  comments: PostComment[] | null;
  commentPopup: boolean;
}
