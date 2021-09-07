
import React, { useState , useEffect} from 'react';
import{moverCuca, postScore, getScores, reset} from '../actions/index.js'
import { connect } from "react-redux";
import './Inicio.css'

    const Inicio = (props) => {     
      const [segundos, setSegundos] = useState(30);
      const [activo, setActivo] = useState(false);
      const [nightMode, setNightMode] = useState(false);
      const [nightDay, setNightDay] = useState('Day');
      const [cucas, setCucas] = useState(20);
      const [dificulty, setDificulty] = useState('Easy')
      const [direction, setDirection] = useState('N')
      const [pos, setPos] = useState({
        x: window.innerHeight/2,
        y: window.innerWidth/2
      })
      const[show, setShow] = useState(false)
      const[sorted, setSorted] = useState([])
      useEffect(() =>   {        
      props.getScores(dificulty)
      props.scores && setSorted(props.scores.sort((a, b) => {return a.score - b.score}))
      }, [dificulty])
      let showScores = function(){
        if(show === false){
          props.getScores(dificulty)
          props.scores && setSorted(props.scores.sort((a, b) => {return a.score - b.score}))
          setShow(true)
        }
        else setShow(false)
      }
      var randomizePos = function(){
        var x;
        var y; 
        x = Math.round(Math.random()*window.innerHeight)/10*7 + Math.round(Math.random()*window.innerHeight)/10
        y = Math.round(Math.random()*window.innerWidth)/10*9
        return {x, y}
      }
      var randomizeDir = function(d){
        var n = Math.random()
        if (n > 0 && n < 0.30 && d !== 'N'){
          setDirection('N')
        }
        if (n > 0.30 && n < 0.5 && d !== 'S'){
          setDirection('S')
        }
        if (n > 0.5 && n < 0.75 && d !== 'E'){
          setDirection('E')
        }
        if (n > 0.75 && n < 1 && d !== 'O'){
          setDirection('O')
        }
      }
      useEffect(() => {      
        setSorted(props.scores.sort((a, b) => {return a.score - b.score})/* .sclice(0, 10) */)
        sorted.slice(0, 10)
        let intervalo = null;
        if(activo){
          intervalo = setInterval(() => {  
              if (dificulty === 'Hard' && window.innerWidth >= 600){
                if(segundos.toFixed(2) - segundos.toFixed(0) === 0){
                  randomizeDir()
                }
                if(direction === 'N' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.x > Math.round(window.innerHeight)/10*9){
                    setPos({
                      ...pos,
                      x: 5,
                    })  
                  }else{
                  setPos({
                    ...pos,
                    x: pos.x + 5
                  })}          
                } 
                
                if(direction === 'S' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.x < 5){
                    setPos({
                      ...pos,
                      x: Math.round(window.innerHeight)/10*9
                    })
                  } else{
                  setPos({
                    ...pos,
                    x: pos.x - 5
                  })}          
                }   
                if(direction === 'E' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.y < 5){
                    setPos({
                      ...pos,
                      y: window.innerWidth-5,
                    })   
                  }else{
                  setPos({
                    ...pos,
                    y: pos.y - 5
                  })}   
                }            
                   
                if(direction === 'O' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.y > window.innerWidth-5){
                    setPos({
                      ...pos,
                      y: 5,
                    })    
                  }else{
                  setPos({
                    ...pos,
                    y: pos.y + 5
                  })}           
                }
              } 
              if (dificulty === 'Hard' && window.innerWidth < 600){
                if(segundos.toFixed(2) - segundos.toFixed(1) === 0){
                  randomizeDir()
                }
                if(direction === 'N' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.x > Math.round(window.innerHeight)/10*9){
                    setPos({
                      ...pos,
                      x: 5,
                    })  
                  }else{
                  setPos({
                    ...pos,
                    x: pos.x + 5
                  })}          
                } 
                
                if(direction === 'S' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.x < 5){
                    setPos({
                      ...pos,
                      x: Math.round(window.innerHeight)/10*9
                    })} else{
                  setPos({
                    ...pos,
                    x: pos.x - 5
                  })}          
                }   
                if(direction === 'E' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.y < 5){
                    setPos({
                      ...pos,
                      y: window.innerWidth-5,
                    })   
                  }else{
                  setPos({
                    ...pos,
                    y: pos.y - 5
                  })}   
                }            
                   
                if(direction === 'O' && (segundos.toFixed(2) - segundos.toFixed(0) < 0.05)){
                  if(pos.y > window.innerWidth-5){
                    setPos({
                      ...pos,
                      y: 5,
                    })    
                  }else{
                  setPos({
                    ...pos,
                    y: pos.y + 5
                  })}           
                }
              } 
                       
/*               if(segundos > 5 && segundos.toFixed(2) - segundos.toFixed(0) === 0.5){
                props.moverCuca2()                
              }
              if(segundos > 10 && segundos.toFixed(2) - segundos.toFixed(0) === 0.2){
                props.moverCuca3()                
              } */
                
            setSegundos(segundos => segundos - 0.01);
          }, 10)             
        }
        if(cucas === 0){
          props.getScores(dificulty)
          setSorted(props.scores.sort((a, b) => {return a.score - b.score})/* .sclice(0, 10) */)
          sorted.slice(0, 10)
          if(sorted && 30 - segundos < sorted[9].score){
            let foo = prompt('New HightScore, type your name');
            props.postScore({nombre:foo, score:30 - segundos, dificulty: dificulty})
          }          
          else 
          alert('Tardaste ' + ((30 - segundos).toFixed(2)) + ' segundos en exterminar a las cucas')
/*           props.postScore({nombre:'Mauro', score:30 - segundos, dificulty: dificulty}) */
          setSorted(props.scores.sort((a, b) => {return a.score - b.score})/* .sclice(0, 10) */)
          sorted.slice(0, 10)
          clearInterval(intervalo);
          setActivo(false);
          setSegundos(30);
          setCucas(20);
          props.reset();
          setPos({
            x: window.innerHeight/2,
            y: window.innerWidth/2
          })
        } 

        if(segundos < 0){
          alert('Demasiado lento.. las cucas escaparon!')
          clearInterval(intervalo);
          setActivo(false);
          setSegundos(30);
          setCucas(20);
          props.reset();
          setPos({
            x: window.innerHeight/2,
            y: window.innerWidth/2
          })
        }
          
        return () => {
          clearInterval(intervalo);      
        }
      }, [activo, segundos, cucas, sorted, show])

      let toggleNight = function() {
        setNightMode(!nightMode);
        if(!nightMode){
          setNightDay('Night')
        }
        else setNightDay('Day')
      }    
      let toggleDif = function(){
        if(dificulty === 'Easy'){
          setActivo(false);
          setSegundos(30);
          setCucas(20);
          props.reset();
          setPos({
            x: window.innerHeight/2,
            y: window.innerWidth/2
          })
          setDificulty('Hard')
        }
        else {
          setActivo(false);
          setSegundos(30);
          setCucas(20);
          props.reset();
          setPos({
            x: window.innerHeight/2,
            y: window.innerWidth/2
          })
          setDificulty('Easy')
      }
      }

      let handleMouseMove = () => {
        if(nightMode){
          var f = function() {
            var follower, init, mouseX, mouseY, positionElement, timer;
          
            follower = document.getElementById('follower');
          
            mouseX = (event) => {
              return event.clientX;
            };
          
            mouseY = (event) => {
              return event.clientY;
            };
          
            positionElement = (event) => {
              var mouse;
              mouse = {
                x: mouseX(event),
                y: mouseY(event)
              };
              follower.style.top = mouse.y + 'px';
              return follower.style.left = mouse.x + 'px';
            };
          
            timer = false;
          
            window.onmousemove = init = (event) => {
              var _event;
              _event = event;
              return timer = setTimeout(() => {
                return positionElement(_event);
              }, 1);
            };        
          }.call(this)
      }
      }

      let handleHit = function(){      

      setCucas(cucas - 1);
      setPos(randomizePos());
      setActivo(true);
      setDirection(randomizeDir());
      }
      
    
  
      return (
        <div className={nightMode ? 'container' : undefined} onMouseMove={handleMouseMove}>
            <div id="follower" className= {nightMode ? 'follower' : undefined}>
              <div id="circle1" className= {nightMode ? 'circle1' : undefined}>
            </div>
          </div> 
          <div className ='bar' >      
            <span className='barText' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg> {cucas}</span>        
            <span className='barText' ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .302.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
</svg> {segundos.toFixed(2)}</span>
            <button className = 'button' onClick = {() => {
              props.reset()
              setSegundos(30)
              setCucas(20)
              setActivo(false)
              setPos({
                x: window.innerHeight/2,
                y: window.innerWidth/2
              })
            }}>Reset</button>          
            {(window.innerWidth > 500) ? <button className = 'button' onClick = {() => toggleNight()}>{nightDay}</button> : null }
            <button className = 'button' onClick = {() => toggleDif()}>{dificulty}</button>  
            <div className='scoresBox'>
            <button className = 'button' onClick = {() => showScores()}>HightScores</button>
            {show ? <div className='scores'>{sorted.slice(0, 10).map(e => <div className='score'><p>{e.nombre}</p>&nbsp;&nbsp;<p>{e.score}</p>&nbsp;&nbsp;<p>{e.dificulty}</p></div>)}</div> :null}
            </div>
          </div>          
          {dificulty === 'Easy' && window.innerWidth < 600 ? <div className = 'cucaBlock'>
            <button className = 'cuca' onClick={() =>handleHit()} style={{position: 'absolute', bottom: (pos.x), right: (pos.y)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg>{!activo && 'Start'}</button>
          </div> : null}
          {dificulty === 'Easy' && window.innerWidth >= 600 ? <div className = 'cucaBlock'>
            <button className = 'cuca' onClick={() =>handleHit()} style={{position: 'absolute', bottom: (pos.x), right: (pos.y)}}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg>{!activo && 'Start'}</button>
          </div> : null}
          {dificulty === 'Hard' && window.innerWidth < 600 ? <div className = 'cucaBlock'>
            <button className = 'cuca' onClick={() =>handleHit()} style={{position: 'absolute', bottom: (pos.x), right: (pos.y)}}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg>{!activo && 'Start'}</button>
          </div> : null}
          {dificulty === 'Hard' && window.innerWidth >= 600 ? <div className = 'cucaBlock'>
            <button className = 'cuca' onClick={() =>handleHit()} style={{position: 'absolute', bottom: (pos.x), right: (pos.y)}}><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg>{!activo && 'Start'}</button>
          </div> : null}
          
        </div>
      );
    }    
  

function mapStateToProps (state){
    return {
      cucaPos: state.cucaPos,
      scores: state.scores,
    }
  }
  function mapDispatchToProps (dispatch){
    return {
      moverCuca: () => dispatch(moverCuca()),
      postScore: score => dispatch(postScore(score)),
      getScores: dif => dispatch(getScores(dif)),
      reset: () => dispatch(reset()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Inicio);