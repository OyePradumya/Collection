import Navbar from './Components/Navbar';
import Display from './Components/Display';
import './App.css';
import {useState} from 'react';
const API_KEY = '28fbc5661601150b79645b7c6c922940';

function App() {
  const [data, setData] = useState(null);
  const handleCallback = (childData) =>{
    setData({childData});
  }

  return (
    <>
    <Navbar parentCallback = {handleCallback}/>
    <Display dispData={data}/>
    </>
  );
}

export default App;
