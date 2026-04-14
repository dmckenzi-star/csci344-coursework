import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";

export default function Posts({ token }) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const data = await getDataFromServer(token, "/api/posts/");
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, []);

  function outputPost(postObject) {
    return (
      <Post
        key={postObject.id}
        postData={postObject}
        token={token}
        onBookmarkChange={getPosts}
      />
    );
  }

  return <>{posts.map(outputPost)}</>;
}
