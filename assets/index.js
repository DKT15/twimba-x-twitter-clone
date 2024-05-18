import { tweetsData } from "/assets/data.js";
const tweetInput = document.getElementById("tweet-input");
const tweetBtn = document.getElementById("tweet-btn");

tweetBtn.addEventListener("click", function () {
  console.log(tweetInput.value);
});

// If the like icon is clicked then handleLikeClick will be passed the uuid stored in the like data attribute.
document.addEventListener("click", function () {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
  }
});

//handleLikeClick has taken in the data from above and passes into the tweetId parameter.
function handleLikeClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId; //checks to see if the uuid property in the data, is the same as the uuid store in the tweetId. If true then the element will be saved to targetTweetObj, if it returns false, the object will be filtered out.
  })[0]; //the filter method will give an array. And the object is saved at postion 0, to targetTweetObj.

  if (targetTweetObj.isLiked) {
    // if isLiked is true it will take away a like otherwise it will add on a like.
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked; //Not operator will flip the other part of the code to inverse state, so if its true, it will be flipped to false and if false it will be flipped to true.

  render(); //allows each tweet to be liked as it gets data from feedHTMl, which iterates over all of the data.
}

// gets data from data.js and loops through each item in the array with the forEach method to display posts in the format specified using the HTML code that has is added on and equal to feedHtml.
function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    feedHtml += `<div class="tweet">
  <div class="tweet-inner">
      <img src="${tweet.profilePic}" class="profile-pic">
      <div>
          <p class="handle">${tweet.handle}</p>
          <p class="tweet-text">${tweet.handle}</p>
          <div class="tweet-details">
              <span class="tweet-detail">
              <i class="fa-regular fa-comment-dots" 
              data-reply="${tweet.uuid}"></i>
              ${tweet.replies.length} 
              </span>
              <span class="tweet-detail">
              <i class="fa-solid fa-heart" 
              data-like="${tweet.uuid}"></i>
              ${tweet.likes}
              </span>
              <span class="tweet-detail">
              <i class="fa-solid fa-retweet" 
              data-retweet="${tweet.uuid}"></i>
              ${tweet.retweets}
              </span>
          </div>   
      </div>            
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
