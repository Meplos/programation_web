import { Button } from "@material-ui/core";
import db from "./firebase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./AddForm.css";

function AddForm({ categories }) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategorie, setPostCategorie] = useState("");
  const history = useHistory();

  const submit = () => {
    db.collection("posts")
      .add({
        title: postTitle,
        categorie: postCategorie,
        content: postContent,
      })
      .then((docRef) => console.log("Document ID : ", docRef.id))
      .catch((error) => console.error("Error adding doc ", error));

    setPostCategorie("");
    setPostContent("");
    setPostTitle("");
    history.push("/");
  };
  return (
    <div className="addForm">
      <form className="form">
        <div className="form__field">
          <p>Title : </p>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        </div>
        <div className="form__field">
          <p>Categorie :</p>
          <select
            className="categorie"
            value={postCategorie}
            onChange={(e) => setPostCategorie(e.target.value)}
          >
            <option value=""></option>
            {categories.map((curr) => (
              <option value={curr.data.name} key={curr.id}>
                {curr.data.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form__field">
          <p>Content : </p>
          <textarea
            id="content"
            placeholder="Enter content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            cols="15"
            rows="15"
          />
        </div>
        {postCategorie !== "" ? (
          <Button type="submit" onClick={submit}>
            Submit
          </Button>
        ) : (
          <Button type="submit" disabled>
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}

export default AddForm;
