// requires utilities.js to be loaded first:
// included in index.html
 
 
const rootURL = "https://photo-app-secured.herokuapp.com";
let token = null;
let username = "dmckenzi";   // change to your username :)
let password = "password";
 
async function initializeScreen() {
    token = await getToken();
    showNav();
    // invoke all of the Part 1 functions here
    showPosts();
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
    posts.forEach(post => {
        const htmlSnippet = postToHTML(post);
        postsContainerEl.insertAdjacentHTML('beforeend', htmlSnippet);
    });
}





//fetching the respond body
//DO NOT forget post 
function postToHTML(post) {
    return `
     <section id="post-${post.id}" class="bg-white border mb-10">
            <div class="p-4 flex justify-between">
                <h3 class="text-lg font-Comfortaa font-bold">${post.user.username}</h3>
                <button class="icon-button"><i class="fas fa-ellipsis-h"></i></button>
            </div>
            <img src="${post.image_url}" alt="${post.alt_text || 'Post by ' + post.user.username}" width="300" height="300"
                class="w-full bg-cover">
            <div class="p-4">
                <div class="flex justify-between text-2xl mb-3">
                    <div>
                        <button><i class="far fa-heart"></i></button>
                        <button><i class="far fa-comment"></i></button>
                        <button><i class="far fa-paper-plane"></i></button>
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
                    <input type="text" class="min-w-[80%] focus:outline-none" placeholder="Add a comment...">
                </div>
                <button class="text-blue-500 py-2">Post</button>
            </div>
        </section>`
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
 




 
function getBookmarkButton(post) {
    if (post.current_user_bookmark_id) {
        return `
        <button onclick="unBookmark(${post.current_user_bookmark_id}, ${post.id})"
                aria-label="Remove bookmark">
            <i class="fas fa-bookmark"></i>
        </button>
        `;
    } else {
        return `
        <button onclick="Bookmark(${post.id})"
                aria-label="Bookmark this post">
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
 
 


async function unBookmark(bookmarkId, postId) {
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
    console.log(data)

    //2. re-fetch the post and redraw it
    await reloadPost(postId);
}
 


async function Bookmark(postId) {
    console.log("create a bookmark");
 
    const postData = {
        "post_id": postId
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
        body: JSON.stringify(postData)
    });
    const data = await response.json();
    console.log(data);
 
    //3. check that it worked successfully — re-fetch and redraw
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
 