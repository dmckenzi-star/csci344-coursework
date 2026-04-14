import React from "react";
import BookmarkButton from "./BookmarkButton";

export default function Post({ postData, token, onBookmarkChange }) {
  return (
    <section className="bg-white border mb-10">
      {/* user header */}
      <div className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">
          {postData.user.username}
        </h3>
        <button className="icon-button">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>

      {/* image */}
      <img
        src={postData.image_url}
        alt={postData.alt_text || "post photo"}
        width="300"
        height="300"
        className="w-full bg-cover"
      />

      <div className="p-4">
        {/* buttons */}
        <div className="flex justify-between text-2xl mb-3">
          <div className="flex gap-2">
            {/* like button (placeholder for now) */}
            <button>
              <i className="far fa-heart"></i>
            </button>
            <button>
              <i className="far fa-comment"></i>
            </button>
            <button>
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
          <div>
            {/* bookmark button */}
            <BookmarkButton
              postId={postData.id}
              bookmarkId={postData.current_user_bookmark_id}
              token={token}
              onBookmarkChange={onBookmarkChange}
            />
          </div>
        </div>

        {/* number of likes */}
        <p className="font-bold mb-3">{postData.likes.length} likes</p>

        {/* caption */}
        <div className="text-sm mb-3">
          <p>
            <strong>{postData.user.username}</strong> {postData.caption}
          </p>
        </div>

        {/* last updated */}
        <p className="uppercase text-gray-500 text-xs">
          {postData.display_time}
        </p>
      </div>
    </section>
  );
}
