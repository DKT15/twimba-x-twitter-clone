import { tweetsData } from "/assets/data.js";
const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", function () {
  console.log(tweetInput.value);
});

// If the like icon is clicked then handleLikeClick will be passed the uuid stored in the like data attribute.
document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
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

// lets the user shoe and hide replys by clicking in the comments.
function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

// gets data from data.js and loops through each item in the array with the forEach method to display posts in the format specified using the HTML code that has is added on and equal to feedHtml.
function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

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

    feedHtml += `<div class="tweet">
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
