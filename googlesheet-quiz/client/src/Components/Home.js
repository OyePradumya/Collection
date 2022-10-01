import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Options from './Options';

function Home(props) {
    const navigate = useNavigate();
    let selrow;
    const [correct, setCorrect] = React.useState(0);
    const [wrong, setWrong] = React.useState(0);
    let [rows, setRows] = React.useState(props.quizdata[0].values.slice(1,));
    function shuffle() {
        rows = rows.sort(() => Math.random() - 0.5);
        setRows(rows);
    }
    const [qno, setQno] = React.useState(1);
    const [cou, setCou] = React.useState(0);
    if (cou == 0 && qno == 1) {
        shuffle();
        setCou(cou + 1);
        props.deleteAns();
    }
    if (qno <= 11) {
        selrow = rows[qno];
    }
    function changeQno(newQno) {
        setQno(newQno);
        setCou(cou + 1);
    }
    function incCorr() {
        setCorrect(correct + 1);
    }
    function incWrong() {
        setWrong(wrong + 1);
    }
    const view =(e)=>{
        e.preventDefault();
        navigate('/answers', { state: {list : props.rowList} })
    }
    return (
        <div className='my-20'>
            <section className="text-gray-400 bg-gray-900 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-wrap justify-center">
                        <div className="p-4 lg:w-1/3">
                            <div className="h-full bg-gray-800 bg-opacity-40 px-8 pt-16 pb-8 rounded-lg overflow-hidden text-center relative">
                                {(qno < 11) ? <><h2 className="tracking-widest text-xs title-font font-medium text-gray-500 mb-1">QUESTION {qno}</h2>
                                    <h1 className="title-font sm:text-2xl text-xl font-medium text-white mb-3">{selrow[0]}</h1>
                                    <p className="leading-relaxed mb-3"></p>
                                    <div className="text-center mt-4 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                                    </div>
                                    <div className='mx-6 mt-6 mb-1 text-gray-300 rounded'>
                                        <Options qno={qno} selrow={selrow} changeQno={changeQno} updateAns={props.updateAns} incCorr={incCorr} incWrong={incWrong} />
                                    </div></> :
                                    <>
                                    <div>
                                        <div className="flex flex-wrap justify-center rounded-lg h-full bg-slate-700 bg-opacity-30 p-8 flex-col shadow gap-6">
                                            <div className="flex justify-center gap-2 items-center mb-3 ">
                                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-green-500 text-white flex-shrink-0">
                                                    <img className='rounded-lg' alt='' src='./correct.png'></img>
                                                </div>
                                                <div>
                                                    <h2 className="text-white text-2xl title-font font-medium">{correct}</h2>
                                                    <h2 className="text-gray-400 title-font">Correct</h2>
                                                </div>
                                            </div>
                                            <div className="flex justify-center gap-3 items-center mb-3 ">
                                                <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-red-500 text-white flex-shrink-0">
                                                    <img className='rounded-lg' alt='' src='./wrong.png'></img>
                                                </div>
                                                <div>
                                                    <h2 className="text-white text-2xl title-font font-medium">{wrong}</h2>
                                                    <h2 className="text-gray-400 title-font">Wrong</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-2 mb-2'>
                                            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 mt-1.5 text-center mr-3 md:mr-0 hover:bg-blue-700 focus:ring-blue-800 shadow-xl" onClick={view}>View answers</button>
                                        </div>
                                        </div>
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
