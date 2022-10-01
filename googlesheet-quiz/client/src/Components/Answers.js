import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Answers(props) {
    const navigate = useNavigate();
    const { state } = useLocation();
    let { list } = state;
    list = list.slice(1,);
    let renderList = list.map((item) => <>
       
        <div className=' bg-slate-800 bg-opacity-25 border border-gray-700 border-opacity-25 rounded-lg py-2 px-2 mx-20 text-slate-400 gap-2 text-center'>
        <div>
            <h2 className="tracking-widest text-xs title-font font-medium text-blue-500 ">QUESTION {list.indexOf(item) + 1}</h2>
        </div>You answered : {item[0]}
            <h1>
                Correct answer : {item[1]}
            </h1>
        </div>
    </>
    );
    const reset = (e) => {
        e.preventDefault();
        props.deleteAns();
        navigate('/');
    }
    return (
        <div className=''>
            <div className='mt-6'>
                {renderList}
            </div>
            <div className='flex justify-center mt-2 mb-2'>
                <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mt-1.5 text-center mr-3 md:mr-0 hover:bg-blue-700 focus:ring-blue-800 shadow-xl" onClick={reset}>Reset quiz</button>
            </div>
        </div>
    )
}

export default Answers
