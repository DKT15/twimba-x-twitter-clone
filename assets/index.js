import { tweetsData } from "/assets/data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// This is an event listener for the page. If any icon is is clicked the data will be passed to respective functions.
document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick(e.target.dataset);
  } else if (e.target.dataset.bookmark) {
    handleBookmarkTweet(e.target.dataset.bookmark);
  }
});

//handleLikeClick has taken in the data from above and passes into the tweetId parameter.
function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId; //testing - checks to see if the uuid property in the data, is the same as the uuid store in the tweetId. If true then the element will be saved to targetTweetObj, if it returns false, the object will be filtered out.
  })[0]; //the filter method will give an array. And the object is saved at postion 0, to targetTweetObj. tagretTweetObj is an array and as the uuid is unique, only 1 object will pass the test above, which means tagetTweetObj will have a length of 1.

  if (targetTweetObj.isLiked) {
    // if isLiked is true it will take away a like otherwise it will add on a like.
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked; //Not operator will flip the other part of the code to inverse state, so if its true, it will be flipped to false and if false it will be flipped to true. Interacts with code above in if statement.

  render(); //allows each tweet to be liked as it gets data from feedHTMl, which iterates over all of the data.
}

function handleRetweetClick(tweetId) {
  const retweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];
  if (retweetObj.isRetweeted) {
    retweetObj.retweets--;
  } else {
    retweetObj.retweets++;
  }
  retweetObj.isRetweeted = !retweetObj.isRetweeted;

  render();
}

// lets the user show and hide replys by clicking in the comments.
function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");

  if (tweetInput.value) {
    //If there is a value in the tweet input, the code below will run.
    tweetsData.unshift({
      // pushes data to the start. This will make the most recent tweet appear at the top.
      handle: `@Scrimba`,
      profilePic: `/assets/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      isdeleted: false,
      uuid: uuidv4(),
    });
    render();
    tweetInput.value = "";
  }
}

function handleBookmarkTweet(bookmarkId) {
  const bookmarkBtn = tweetsData.filter(function (tweet) {
    return tweet.uuid === bookmarkId;
  })[0];

  bookmarkBtn.isbookmarked = !bookmarkBtn.isbookmarked; //flips between true or false based on whether or not the use bookmarks.

  render();
  console.log(bookmarkBtn);
}

// gets data from data.js and loops through each item in the array with the forEach method to display posts in the format specified using the HTML code that has is added on and equal to feedHtml.
function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    const likeIconClass = tweet.isLiked ? "liked" : "";

    const retweetIconClass = tweet.isRetweeted ? "retweeted" : "";

    let repliesHtml = "";

    const bookmarkIconClass = tweet.isbookmarked ? "bookmarked" : "";

    // if the length of the replies is greater than 0 then the tweet has replies and the code will execute.
    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        // looping through each reply to add to format and add to HTML.
        repliesHtml += `<div class="tweet-reply">
      <div class="tweet-inner">
          <img src="${reply.profilePic}" class="profile-pic">
              <div>
                  <p class="handle">${reply.handle}</p>
                  <p class="tweet-text">${reply.tweetText}</p>
              </div>
          </div>
      </div>`;
      });
    }

    feedHtml += `<div id="tweet" class="tweet">
  <div class="tweet-inner">
  <img src="${tweet.profilePic}" class="profile-pic">
  <div>
      <p class="handle">${tweet.handle}</p>
      <p class="tweet-text">${tweet.tweetText}</p>
      <div class="tweet-details">
          <span class="tweet-detail">
              <i class="fa-regular fa-comment-dots"
              data-reply="${tweet.uuid}"
              ></i>
              ${tweet.replies.length}
          </span>
          <span class="tweet-detail">
              <i class="fa-solid fa-heart ${likeIconClass}"
              data-like="${tweet.uuid}"
              ></i>
              ${tweet.likes}
          </span>
          <span class="tweet-detail">
              <i class="fa-solid fa-retweet ${retweetIconClass}"
              data-retweet="${tweet.uuid}"
              ></i>
              ${tweet.retweets}
          </span>
          <span class="tweet-detail">
          <i class="fa-solid fa-bookmark ${bookmarkIconClass}" 
          data-bookmark="${tweet.uuid}"></i> 
          </span>
        </div> 
      </div>            
  </div>
  <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
    </div> 
</div>`;
  });
  return feedHtml;
}

// renders code in the getFeedHTML to the page.
function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
