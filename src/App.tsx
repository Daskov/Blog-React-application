import { Main } from "./pages/Main/Main";
import PostDetails from "./pages/PostDetails/PostDetails";
import { store } from "./store";
import "./App.scss";
import { Header } from "./components/Header/Header";
import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/post/:id" element={<PostDetails />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
};
