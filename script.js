const twitterBtn = document.getElementById('twitter');
const tagBtn = document.getElementById('addTag');
const dayInput = document.getElementById('dayCount');
const tagText = ` #100DaysOfCode`;
const textArea = document.getElementById('tweetText');
const dayNumberInput = document.getElementById('dayCount');
const hiddenDiv = document.getElementById('count');
const redSpan = document.getElementById('red');
let dateStamp = new Date().toISOString().split('T'[0]).splice(0, 1);
let dateBx = document.getElementById('date-picker');
let savedValues;
let startDate;
let dayNumber;

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
  startDate = new Date();
  savedValues = {
    dayValue: dayNumber,
    startDateValue: startDate,
  };
  localStorage.setItem('dayKey', JSON.stringify(savedValues));
  document.getElementById('tweetText').value = `Day${dayNumber}`;
}

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('dayKey')) {
    savedValues = JSON.parse(localStorage.getItem('dayKey'));
    dayNumber = parseInt(savedValues.dayValue);
    startDate = savedValues.startDateValue.split('T'[0]).splice(0, 1);
    dayNumber = dateDiff(dateStamp, startDate);
    document.getElementById('dayCount').value = dayNumber;
    document.getElementById('tweetText').value = `Day${dayNumber}`;
    document.getElementById('date-picker').value = startDate;
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

function dateDiff(startDate, endDate) {
  return Math.floor(Date.parse(startDate) - Date.parse(endDate)) / 86400000;
}

function changeStartDate() {
  startDate = dateBx.value;
  dayNumber = dayNumberInput.value;
  dayNumber = dateDiff(dateStamp, startDate);
  savedValues = {
    dayValue: dayNumber,
    startDateValue: startDate,
  };
  localStorage.setItem('dayKey', JSON.stringify(savedValues));
  document.getElementById('tweetText').value = `Day${dayNumber}`;
  document.getElementById('dayCount').value = dayNumber;
}

twitterBtn.addEventListener('click', sendTweet);
tagBtn.addEventListener('click', insertTag);
dayInput.addEventListener('change', saveLocal);
dateBx.addEventListener('change', changeStartDate);
