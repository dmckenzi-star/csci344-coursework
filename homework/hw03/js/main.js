// requires utilities.js to be loaded first:
// included in index.html

const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "dmckenzi"; // change to your username :)
let password = "password";

async function initializeScreen() {
  token = await getToken();
  showProfileHeader();
  showNav();
  // invoke all of the Part 1 functions here
  showPosts();
  showSuggestions();
  showStories();
}

async function showProfileHeader() {
  // fetch the posts from /api/posts
  const endpoint = `${rootURL}/api/profile/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const profile = await response.json(); //array of objects
  console.log(profile);
  const profileContainerEl = document.querySelector("#profileContainer");
  profileContainerEl.innerHTML = `
    <header class="flex gap-4 items-center">
    <img src="${profile.image_url}" alt="${profile.username}'s profile picture" class="rounded-full w-16" />
    <h2 class="font-Comfortaa font-bold text-2xl">${profile.username}</h2>
    </header>`;
}

async function showSuggestions() {
  const endpoint = `${rootURL}/api/suggestions/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const suggestions = await response.json(); //array of objects
  console.log(suggestions);
  const suggestionsContainerEl = document.querySelector(
    "#suggestionsContainer",
  );
  suggestionsContainerEl.innerHTML = `
    <p class="text-base text-gray-400 font-bold mb-4">Suggestions for you</p>`;

  // loop through the posts
  // build each post's HTML (or call a helper function)
  // insert the rendered posts into the DOM
  suggestions.forEach((suggestion) => {
    const htmlSnippet = suggestionsToHTML(suggestion);
    suggestionsContainerEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });

  // fetch the suggested accounts from /api/suggestions
  // select the container where the suggestions should go
  // loop through or map over the returned accounts
  // build an HTML string for each suggested account
  // insert the combined HTML into the DOM
}

async function showStories() {
  const endpoint = `${rootURL}/api/stories/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const stories = await response.json(); //array of objects
  console.log(stories);
  const storiesContainerEl = document.querySelector("#storiesContainer");
  storiesContainerEl.innerHTML = "";

  // loop through the posts
  // build each post's HTML (or call a helper function)
  // insert the rendered posts into the DOM
  stories.forEach((story) => {
    const htmlSnippet = storiesToHTML(story);
    storiesContainerEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
  // fetch the stories from /api/stories
  // select the stories container
  // loop through or map over the returned stories
  // build an HTML string for each story
  // insert the combined HTML into the DOM
}

//fetch and display the posts
async function showPosts() {
  // fetch the posts from /api/posts
  const endpoint = `${rootURL}/api/posts/`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const posts = await response.json(); //array of objects
  console.log(posts);
  const postsContainerEl = document.querySelector("#postsContainer");

  // clear any old posts before rendering
  postsContainerEl.innerHTML = "";

  // loop through the posts
  // build each post's HTML (or call a helper function)
  // insert the rendered posts into the DOM
  posts.forEach((post) => {
    const htmlSnippet = postToHTML(post);
    postsContainerEl.insertAdjacentHTML("beforeend", htmlSnippet);
  });
}

function suggestionsToHTML(suggestion) {
  return `
   <section class="flex justify-between items-center mb-4 gap-2">
                <img src="${suggestion.thumb_url}" alt="${suggestion.username}'s profile picture" class="rounded-full" />
                <div class="w-[180px]">
                    <p class="font-bold text-sm">${suggestion.username}</p>
                    <p class="text-gray-500 text-xs">suggested for you</p>
                </div>
                <button class="text-blue-500 text-sm py-2">follow</button>
              </section>`;
}

function storiesToHTML(story) {
  return `
   <div class="flex flex-col justify-center items-center">
    <img src="${story.user.thumb_url}" alt="${story.user.username}'s story" class="rounded-full border-4 border-gray-300" />
    <p class="text-xs text-gray-500">${story.user.username}</p>
</div>`;
}

//fetching the respond body
//DO NOT forget (post)
function postToHTML(post) {
  return `
     <section id="post-${post.id}" class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button" aria-label="More options"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text || "Post by " + post.user.username}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>  
                      ${getLikeButton(post)} 
                        <button aria-label="Comment"><i class="far fa-comment"></i></button>
                        <button aria-label="Share"><i class="far fa-paper-plane"></i></button>
                    </div>
                    <div>
                        ${getBookmarkButton(post)}  
                       
                    </div>
                </div>
                <p class="font-bold mb-3">${post.likes.length} like${post.likes.length !== 1 ? "s" : ""}</p>
                <div class="text-sm mb-3">
                    <p>
                        <strong>${post.user.username}</strong>
                        ${post.caption || ""}
                    </p>
                </div>
                ${getComments(post)}
                <p class="uppercase text-gray-500 text-xs">${post.display_time}</p>
            </div>
            <div class="flex justify-between items-center p-3">
                <div class="flex items-center gap-3 min-w-[80%]">
                    <i class="far fa-smile text-lg"></i>
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment..." aria-label="Add Comment">
                </div>
          
                <button class="text-blue-500 py-2">Post</button>
            </div>
            
            
        </section>`;
}

// helper function for rendering comments
function getComments(post) {
  // if there are no comments, return an empty string
  if (!post.comments || post.comments.length === 0) {
    return "";
  }
  // if there is exactly one comment, render just that comment
  if (post.comments.length === 1) {
    const c = post.comments[0];
    return `
            <p class="text-sm mb-3">
                <strong>${c.user.username}</strong>
                ${c.text}
            </p>`;
  }

  // if there is more than one comment:
  //     render a "view all n comments" button
  //     render only the most recent comment underneath it
  const lastComment = post.comments[post.comments.length - 1];
  return `
        <button class="text-sm mb-3 text-gray-500">View all ${post.comments.length} comments</button>
        <p class="text-sm mb-3">
            <strong>${lastComment.user.username}</strong>
            ${lastComment.text}
        </p>`;
}

function getLikeButton(post) {
  // if post.current_user_like_id exists:
  if (post.current_user_like_id) {
    return `
        <button onclick="unlike(${post.current_user_like_id}, ${post.id})"
            aria-label="Remove Like">
          <i class="fas fa-heart  text-red-500"></i>
          </button>
          `;
    //     render the filled / red heart icon
    // otherwise:
    //     render the hollow heart icon
  } else {
    return `
    <button onclick="like(${post.id})"
    aria-label="like this post">
      <i class="far fa-heart "></i>
      </button>
      `;
  }
}

function getBookmarkButton(post) {
  if (post.current_user_bookmark_id) {
    return `
        <button onclick="unbookmark(${post.current_user_bookmark_id}, ${post.id})"
                aria-label="Remove bookmark">
            <i class="fas fa-bookmark"></i>
        </button>
        `;
  } else {
    return `
        <button onclick="bookmark(${post.id})"
                aria-label="bookmark this post">
            <i class="far fa-bookmark"></i>
        </button>
        `;
  }
}

// re-fetch a single post from the server then redraw it
async function reloadPost(postId) {
  const endpoint = `${rootURL}/api/posts/${postId}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const post = await response.json();
  console.log("Reloaded post:", post);

  // redraw: replace the old HTML with fresh data
  const postEl = document.querySelector(`#post-${postId}`);
  postEl.outerHTML = postToHTML(post);
}

async function unbookmark(bookmarkId, postId) {
  console.log("delete a bookmark");

  //1. issue a DELETE request to the server
  const endpoint = `${rootURL}/api/bookmarks/${bookmarkId}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);

  //2. re-fetch the post and redraw it
  await reloadPost(postId);
}

async function bookmark(postId) {
  console.log("create a bookmark");

  const postData = {
    post_id: postId,
  };

  //1. issue a POST request to the server
  //2. send it the data it needs
  const endpoint = `${rootURL}/api/bookmarks/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);

  //3. check that it worked successfully — re-fetch and redraw
  await reloadPost(postId);
}

//await / async syntax:
async function like(postId) {
  console.log("create a like");

  const postData = {
    post_id: postId,
  };
  const endpoint = `${rootURL}/api/likes/`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(postData),
  });
  const data = await response.json();
  console.log(data);

  await reloadPost(postId);
}

async function unlike(likeId, postId) {
  console.log("delete a like");

  //1. issue a DELETE request to the server
  const endpoint = `${rootURL}/api/likes/${likeId}`;
  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);

  //2. re-fetch the post and redraw it
  await reloadPost(postId);
}

async function getToken() {
  return await getAccessToken(rootURL, username, password);
}

function showNav() {
  document.querySelector("#nav").innerHTML = `
    <nav class="flex justify-between py-5 px-9 bg-white border-b fixed w-full top-0">
            <h1 class="font-Comfortaa font-bold text-2xl">Photo App</h1>
            <ul class="flex gap-4 text-sm items-center justify-center">
                <li><span>${username}</span></li>
                <li><button class="text-blue-700 py-2">Sign out</button></li>
            </ul>
        </nav>
    `;
}

// implement remaining functionality below:

// after all of the functions are defined,
// invoke initialize at the bottom:
initializeScreen();
