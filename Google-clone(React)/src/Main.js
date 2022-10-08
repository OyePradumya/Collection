import { React, useState, useRef } from 'react';
import google from './images/google.png'
import mic from './images/mic.png'
import search from './images/search.png'
export default function Main() {
  const [getQuery, setGetQuery] = useState(null)
  const input = useRef()
  const onClick = () => {
    if (getQuery) {
      let url=`https://www.google.com/search?q=${getQuery}`
      window.open(url, '_self')
   }
  }
  const feelingLucky = () => {
   window.open(`https://www.google.com/doodles`,'_self')
 }
  return (
    <div className="App">
      <div className="main">
        <img src={google} alt="googleImg" />
        <div className="searchArea">
          <input type="text" className="searchInput" ref={input}onChange={(e)=> setGetQuery(e.target.value)}/>
            <div className="icons">
            <img src={search} alt="" />
              <img src={mic} alt="" />
            </div>
          </div>
          <div className="button">
            <button className="searchBtn" id="search" onClick={onClick}>Google Search</button>
            <button className="searchBtn" id="feelinglucky" onClick={feelingLucky}>I'm Feeling Lucky</button>
          </div>
      </div>
    </div>
  );
}

