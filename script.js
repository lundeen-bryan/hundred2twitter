const twitterBtn = document.getElementById('twitter');
const tagBtn = document.getElementById('addTag');

//Tweet textarea
function sendTweet() {
  const tweetText = document.getElementById('tweet').value;
  const twitteUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(twitteUrl, '_blank'); //make twitter open in a new window
}

// add tag to tweet
function insertTag() {
  const tagText = ` %23100DaysOfCode`;
  const textArea = document.getElementById('tweet').value;
  let newText = textArea.trim();
  document.getElementById('tweet').value = newText + tagText;
  document.getElementById('tweet').focus();
}

// Event Listener
twitterBtn.addEventListener('click', sendTweet); //if the tweet btn is clicked snd it to twitter
tagBtn.addEventListener('click', insertTag); //if the tag btn is clicked
