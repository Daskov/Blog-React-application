import "./styles.scss";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPostsAsync } from "../../store/action";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector(({ mainSlice }) => mainSlice);

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
        </div>
      </div>
    </>
  );
};
