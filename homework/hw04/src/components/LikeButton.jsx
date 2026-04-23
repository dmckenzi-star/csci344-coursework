import React from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function LikeButton({ post, token, refreshPosts }) {
  const isLiked = post.current_user_like_id !== undefined;

  async function handleClick() {
    if (isLiked) {
      await deleteDataFromServer(
        token,
        `/api/likes/${post.current_user_like_id}`,
      );
    } else {
      await postDataToServer(token, "/api/likes/", {
        post_id: post.id,
      });
    }
    await refreshPosts();
  }

  return (
    <button onClick={handleClick} aria-label={isLiked ? "Unlike" : "Like"}>
      <i
        className={isLiked ? "fas fa-heart text-red-600" : "far fa-heart"}
        aria-hidden="true"
      ></i>
    </button>
  );
}
