const twitterBtn = document.getElementById('twitter');
const tagBtn = document.getElementById('addTag');
const dayInput = document.getElementById('dayCount');
let dayValue = document.getElementById('dayCount').value;
let dateStarted;
let savedDayNum;

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

// save date to start count in local store
function startDate() {
  dayValue = document.getElementById('dayCount').value;
  dateStarted = new Date();
  savedDayNum = {
    dayNum: dayValue,
    dateStart: dateStarted,
  };
  localStorage.setItem('dayCount', JSON.stringify(savedDayNum));
}

// Wait for pg to load then pull vals from local storage
document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('dayCount')) {
    savedDayNum = JSON.parse(localStorage.getItem('dayCount'));
    dateStarted = savedDayNum.dateStart;
    savedDayNum = savedDayNum.dayNum;
    document.getElementById('dayCount').value = savedDayNum;
  }
});

// Event Listener
twitterBtn.addEventListener('click', sendTweet); //if the tweet btn is clicked snd it to twitter
tagBtn.addEventListener('click', insertTag); //if the tag btn is clicked insert tag
dayInput.addEventListener('change', startDate); // save the date that the user changes the daycount
