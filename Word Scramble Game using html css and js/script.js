const wordText=document.querySelector(".word");
hintText=document.querySelector(".hint span");
timeText=document.querySelector(".time b");
inputField=document.querySelector("input");
refreshBtn=document.querySelector(".refresh-word");
checkBtn=document.querySelector(".check-word");
const correctsound=new Audio("correct.mp3");
const wrongsound=new Audio("wrong.mp3");
const oversound=new Audio("over.mp3");
let correctWord,timer;

const initTimer=maxTime=>{
    clearInterval(timer);
    timer=setInterval(()=>{
        if(maxTime>0){
            maxTime--;
            return timeText.innerText=maxTime;
        }
        clearInterval(timer);
        oversound.play();
        alert(`Time Off! ${correctWord.toUpperCase()} was the correct word`);
        
        initGame();
    },1000);
}

const initGame=()=>{
    initTimer(16);
    let randomObj=words [Math.floor(Math.random()*words.length)];//getting random object from words
    let wordArray=randomObj.word.split("");//splitting each letter of random word
    for(let i=wordArray.length-1;i>0;i--){
        let j=Math.floor(Math.random()*(i+1));
        [wordArray[i],wordArray[j]]=[wordArray[j],wordArray[i]];
    }
    wordText.innerText=wordArray.join("");//passing shuffled word as word text
    hintText.innerText=randomObj.hint;
    correctWord=randomObj.word.toLowerCase();
    inputField.value="";
    inputField.setAttribute("maxlength",correctWord.length);
    // console.log(randomObj);
}
initGame();

const checkWord=()=>{
    let userWord=inputField.value.toLocaleLowerCase();
    if(!userWord)
    { 
        wrongsound.play();
        return alert("Please enter a word check");
    }
        
    // console.log(userWord);
    if(userWord!==correctWord)
    {
        wrongsound.play();
        return alert(`Oops! ${userWord} is not a correct word`);
    }
    correctsound.play();    
    alert(`Congrats! ${userWord.toUpperCase()} is a correct word`);
    initGame();
}
refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord);