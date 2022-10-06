const api={
    key:"f27dcc08a5bbd883380cf7fccd56d61e",
    baseurl:"http://api.openweathermap.org/data/2.5/"

}
const searchbox = document.querySelector('.search-box');

searchbox.addEventListener('keypress',setQuery);

function setQuery(evt){
    if(evt.keyCode==13){

        getResults(searchbox.value);
       // console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather =>{
      //  console.log(weather.json());
        return weather.json();
    }).then(displayResults);
   
}

function displayResults (weather){
    //console.log(weather);
    let city =document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now =new Date();
    let date =document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
   let temp =document.querySelector('.current .temp');
   temp.innerHTML=`${Math.round(weather.main.temp)}<span> °c</span>`;
   let weather_element = document.querySelector('.current .weather');

   weather_element.innerText=weather.weather[0].main;
let .hilow =document.querySelector('hi-low');
hilow.innerText=`${weather.main.temp_min} °c / ${weather.main.temp_max} °c`;

}



function dateBuilder(d){
    let months=["january","February","March","April","May","June"
,"July","August","September","October","November","December"];
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

let day=days[d.getDay()];
let date =d.getDate();
let month=months[d.getMonth()];
let year=d.getFullYear();

return `${day} ${date} ${month} ${year}`;
}
