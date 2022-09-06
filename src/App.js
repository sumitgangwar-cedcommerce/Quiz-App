import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { LinearProgress } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


function App() {
  const [qtype , setQtype] = useState('')
  const [start , setStart] = useState(-1)
  const [counter , setCounter] = useState(0)
  const [score , setScore] = useState(0)
  var [timer , setTimer] = useState(300)
  
  const [math , setMath] = useState([
    {ques : "Area of Circle (r is radius of circle)" , option : ['π * r * r' , 'π/2 * r * r' , '22π/7 * r * r ' , '2 * π * r' ] , ans :0 , sel_ans:-1},
    {ques : "Evaluate 99%( percent ) of 110" , option : [99.1 , 108.1 , 108.9 , 99.9] , ans :2 , sel_ans:-1},
    {ques : "Find 2+2-2+2*0/2 = ?" , option : [2 , -2 , 0 , 'Infinity' ] , ans :0 , sel_ans:-1},
    {ques : "Number of permutations of set={1 , 2 , 3}" , option : [27 , 9 , 3 , 6] , ans :3 , sel_ans:-1},
    {ques : "Find 8.254 + 4.2672 = ?" , option : [12.5216  , 12.5212 , 12.4212 , 12.4216] , ans :1 , sel_ans:-1}
  ])

  const seq = [' A ' , ' B ' , ' C ' , ' D ']

  const next_ques = ()=>{
    if(counter<4){
      setCounter(counter+1)

    }
  }
  const prev_ques = ()=>{
    if(counter>0){
      setCounter(counter-1)
    }
  }
  const optionClick = (opt , isSelect) =>{
    if(isSelect){
      math[counter].sel_ans = opt;
      
      setMath([...math])
    }
    else {
      math[counter].sel_ans = -1;
      setMath([...math])
    }
  }


  const startQuiz = (i)=>{
    setStart(i)
    setInterval(()=>{
      timer = Number(timer)-1;
      setTimer(timer)
    },1000)
  }

  const finish_quiz = ()=>{
    let t = 0;
    math.map(item =>{
      if(item.ans === item.sel_ans){
        t+=20;
      }
      else if(item.sel_ans!==-1){
        t-=5;
      }
    })
    setScore(t)
    setStart(0);
  }

  useEffect(()=>{
    if(timer===0){
      finish_quiz();
    }
  },[timer])


  return (
    <div className="App">
      {
        qtype === ''  ? 
        <>
          <h1>
          Welcome to Quiz App
          </h1>
          <div className='qtype animate__animated animate__backInRight'>
            <div onClick={()=>setQtype('math')}>
              <span>Math quiz</span> <span><ArrowRightIcon /></span>
            </div>
            <div onClick={()=>setQtype('english')}>
              <span>English quiz</span> <span><ArrowRightIcon /></span>
            </div>
            <div onClick={()=>setQtype('gk')}>
              <span>GK quiz</span> <span><ArrowRightIcon /></span>
            </div>
          </div>
        </>
        :
        start === -1 ?
        <div className='info-div animate__animated animate__zoomInDown'>
          <p>No. of questions : 5</p>
          <p>Time given : 5 min</p>
          <p className='scheme'>
            Marking Scheme:
            <ul>
              <li>Correct ans = +20</li>
              <li>Incorrect ans = -5</li>
              <li>Unvisited ans = 0</li>
            </ul>
          </p>
          <div className='info-button'>
            <button style={{backgroundColor:'red'}} onClick={()=>startQuiz(1)}>Start</button>
            <button style={{backgroundColor:'grey'}} onClick={()=>setQtype('')}>Cancel</button>
          </div>
        </div> 
        :
        start === 1 ?
        <>
        <div className='timer'>
          <p>{Math.floor(Number(timer)/60)} min  {Number(timer)%60} sec Left</p>
        </div> 
        <div className='question-div animate__animated animate__zoomIn'>
          <LinearProgress color="success" variant='determinate' value={(counter*20)+20}/>
          <p className='question'>
            Ques {counter+1} {"  :  "} {math[counter].ques}
          </p>
          <div className='options'>
            {
              math[counter].option.map((opt , i)=>
                math[counter].sel_ans === i ?
                <p onClick={()=>optionClick(i , 0)} className='active-opt' key={i}>{seq[i]} : {opt}</p> :
                <p key={i} onClick={()=>optionClick(i , 1)}>{seq[i]} : {opt}</p>
              )
            }
          </div>
          <div className='opt-btn'>
            {
              counter === 0 ?
                <button onClick={next_ques} style={{backgroundColor:'#1877F2'}}>Next</button>
                :
                counter!== 4 ? 
                  <>
                    <button onClick={prev_ques} style={{backgroundColor:'grey'}}>Previous</button>
                    <button onClick={next_ques} style={{backgroundColor:'#1877F2'}}>Next</button>
                  </>
                  :
                  <>
                    <button onClick={prev_ques} style={{backgroundColor:'grey'}}>Previous</button>
                    <button className='finish_quiz' onClick={finish_quiz}>Finish Quiz</button>
                  </>
            }
            
          </div>
        </div></>
        :
        <div className='res animate__animated animate__jackInTheBox'>
          <h1>Your Score</h1>
          <div className='score'>
            <span>{score} out of 100</span>
          </div>
          <div className='res-s'>
            <h4>Quiz Summary</h4>
            {
              math.map((item , i)=>
                <div className='res-ques'>
                  <p>Q:{i+1} {item.ques}</p>
                  {
                    item.ans === item.sel_ans ? 
                      <>
                        <p style={{color:'green'}}>Correct : {item.option[item.ans]}</p>
                      </>
                      :
                      <>
                        {item.sel_ans!==-1 ?
                          <p style={{color:'red'}}>Your ans : {item.option[item.sel_ans]}</p>
                          :
                          <p style={{color:'grey'}}>Not Visited</p>
                        }
                        <p style={{color:'green'}}>Correct ans :{item.option[item.ans]}</p>

                      </>
                  }
                </div>
              )
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App;
