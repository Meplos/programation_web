import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./firebase";
import Post from "./Post";
import AddForm from "./AddForm";
import CreateIcon from "@material-ui/icons/Create";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";

function App() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [all, setAll] = useState(true);

  const [currentCategorie, setCurrentCatgorie] = useState(categories[0]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snap) =>
      setPosts(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  useEffect(() => {
    db.collection("categories").onSnapshot((snap) =>
      setCategories(
        snap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="app__navbar">
          <h1 onClick={(e) => setAll(true)}>Blog</h1>
          <div className="app__navbarContainer">
            {categories.map((categorie) => (
              <Link key={categorie.id} to="/">
                <div
                  className="app__navbarButton"
                  onClick={(e) => {
                    setCurrentCatgorie(categorie.data.name);
                    setAll(false);
                  }}
                >
                  {categorie.data.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Switch>
          <Route path="/add">
            <h1 className="app__title">Add</h1>
            <AddForm categories={categories} />
          </Route>
          <Route path="/">
            <div className="app_header">
              <h1 className="app__title">{currentCategorie}</h1>
              <Link to="/add">
                <IconButton>
                  <CreateIcon />
                </IconButton>
              </Link>
            </div>
            <div className="app__posts">
              {posts.map(
                (post) =>
                  (all || currentCategorie === post.data.categorie) && (
                    <Post
                      key={post.id}
                      title={post.data.title}
                      content={post.data.content}
                    />
                  )
              )}
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
