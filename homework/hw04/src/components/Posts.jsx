import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";

export default function Posts({ token }) {
  const [posts, setPosts] = useState([]);

  async function getPosts() {
    const data = await getDataFromServer(token, "/api/posts");
    setPosts(data);
  }

  useEffect(() => {
    getPosts();
  }, [token]);

  return (
    <section>
      {posts.slice(0, 10).map((post) => (
        <Post key={post.id} post={post} token={token} refreshPosts={getPosts} />
      ))}
    </section>
  );
}
