import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import QuizData from './QuizData.json';
import Answers from './Components/Answers';

function App() {
  let initRow;
  if (localStorage.getItem("rows") === null) {
    initRow = [[]]
  }
  else {
    initRow = JSON.parse(localStorage.getItem("rows"));
  }
  const [rowList, setRows] = useState(initRow);
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rowList));
  }, [rowList])
  function updateAns(row) {
    setRows([...rowList, row]);
  }
  function deleteAns(row) {
    setRows([[]]);
  }

  const [quizdata, setQuizdata] = useState(QuizData);
  async function getQuizData() {
    const response = await fetch('https://googlesheet-quiz.herokuapp.com/api/quiz/getquiz', {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
      },
    });
    const json = await response.json();
    setQuizdata(json);
    return json;
  }
  useEffect(() => {
    getQuizData();
  }, []);
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home quizdata={quizdata} updateAns={updateAns} rowList={rowList} deleteAns={deleteAns} />} />
          <Route path="/answers" element={<Answers deleteAns={deleteAns} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
