const twitterBtn = document.getElementById('twitter');
const tagBtn = document.getElementById('addTag');
const dayInput = document.getElementById('dayCount');
const tagText = ` #100DaysOfCode`;
const textArea = document.getElementById('tweetText');
const dayNumberInput = document.getElementById('dayCount');
const hiddenDiv = document.getElementById('count');
const redSpan = document.getElementById('red');
let dateStamp;
let savedValues;

function sendTweet() {
  const tweetText = encodeURIComponent(
    document.getElementById('tweetText').value
  );
  const twitteUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
  window.open(twitteUrl, '_blank');
}

function insertTag() {
  let newText = textArea.value.trim();
  document.getElementById('tweetText').value = newText + tagText;
  document.getElementById('tweetText').focus();
}

function saveLocal() {
  dayNumber = dayNumberInput.value;
  dateStamp = new Date();
  savedValues = {
    dayValue: dayNumber,
    dateValue: dateStamp,
  };
  localStorage.setItem('dayKey', JSON.stringify(savedValues));
  document.getElementById('tweetText').value = `Day${dayNumber}`;
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('dayKey')) {
    savedValues = JSON.parse(localStorage.getItem('dayKey'));
    dayNumber = savedValues.dayValue;
    dateStamp = savedValues.dateValue;
    document.getElementById('dayCount').value = dayNumber;
    document.getElementById('tweetText').value = `Day${dayNumber}`;
  }
});

textArea.addEventListener('input', function () {
  const target = event.currentTarget;
  const maxLength = target.getAttribute('maxlength');
  const currentLength = target.value.length;
  const countRemaining = maxLength - currentLength;
  if (countRemaining < 21) {
    hiddenDiv.removeAttribute('hidden');
    redSpan.innerHTML = `${countRemaining}`;
  } else {
    hiddenDiv.setAttribute('hidden', 'hidden');
  }
});

twitterBtn.addEventListener('click', sendTweet);
tagBtn.addEventListener('click', insertTag);
dayInput.addEventListener('change', saveLocal);
