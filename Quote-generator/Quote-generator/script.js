// get quotes from API

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

// List of Quote
let apiQuotes = [];

// Show loader
function showLoader(){
    quoteContainer.style.display = "none";
    // quoteContainer.style.opacity = "0";
    loader.style.display = "block";
    
}

// Hide Loader
function hideLoader(){
    loader.style.display = "none";
    quoteContainer.style.display = "block";
}

// Pick a random quote
const newQuote = () => {
    showLoader();
    let random_number =  Math.floor(Math.random() * Math.floor(8000));
    const quote = apiQuotes[random_number];

    // Decrease Font size if text is large
    if(quote.text.length>80)
        quoteText.classList.add('long-text');
    else
        quoteText.classList.remove('long-quote');

    //check if Author field is empty        
    if(quote.author){
        authorText.textContent = "-" + quote.author;
    }else{
        authorText.textContent = "-Unknown" ;
    }
    // Set Quote and hide loader
    quoteText.textContent = quote.text;
    hideLoader();
};

// Get quote from api
async function getquotes(){
    showLoader();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(newQuote());
    }catch(error){
        // catch error here
        console.log("error occured bro " + error)
    }
}

//Tweet quote

function tweetQuote(){
    const twitterUrl = ` https://twitter.com/intent/tweet?text = ${quoteText.textContent} - ${authorText.textContent}`; 

    window.open(twitterUrl , '_blank');
}

// Event lisnteners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
 
// Onload 
setTimeout(getquotes,2000);