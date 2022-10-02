var outputDiv = document.querySelector('#output');

var genButton = document.querySelector('#generate');

var apiUrl = "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw&type=single";

function getJokes() {
    fetch(apiUrl)
    .then (response => response.json())
    .then (response =>
        {
            var outputText = response.joke;
            outputDiv.innerHTML = outputText;
            console.log("joke" , response);
        })

        .catch(err =>{
            console.error(err)
        });
}

function clickHandler() {
    getJokes();
}

getJokes();

genButton.addEventListener("click", clickHandler)
