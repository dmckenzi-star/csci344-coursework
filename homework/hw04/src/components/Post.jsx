import React from "react";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import Comments from "./Comments";

export default function Post({ post, token, refreshPosts }) {
  return (
    <article className="bg-white border rounded-md shadow-sm mb-10">
      <header className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">
          {post.user.username}
        </h3>
        <button className="icon-button" aria-label="Post options">
          <i className="fas fa-ellipsis-h" aria-hidden="true"></i>
        </button>
      </header>

      <img
        src={post.image_url}
        alt={post.alt_text || `Photo by ${post.user.username}`}
        className="w-full bg-cover"
      />

      <div className="p-4">
        <div className="flex justify-between text-2xl mb-3">
          <div>
            <LikeButton post={post} token={token} refreshPosts={refreshPosts} />
            <button aria-label="Comment">
              <i className="far fa-comment" aria-hidden="true"></i>
            </button>
            <button aria-label="Share">
              <i className="far fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
          <div>
            <BookmarkButton
              post={post}
              token={token}
              refreshPosts={refreshPosts}
            />
          </div>
        </div>

        <p className="font-bold mb-3">{post.likes.length} likes</p>

        <div className="text-sm mb-3">
          <p>
            <strong>{post.user.username}</strong> {post.caption}
          </p>
        </div>

        <Comments comments={post.comments} />

        <p className="text-xs text-gray-700 uppercase">{post.display_time}</p>
      </div>
    </article>
  );
}
