const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

function hideQuoteAndShowLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function showQuoteAndRemoveLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote() {
  showQuoteAndRemoveLoadingSpinner();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    quoteText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  showQuoteAndRemoveLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
  hideQuoteAndShowLoadingSpinner();
  const proxyUrl = "http://api.allorigins.win/get?url=";
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    let data = await response.json();
    apiQuotes = JSON.parse(data.contents);
    newQuote();
  } catch (error) {}
}

// Tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();
