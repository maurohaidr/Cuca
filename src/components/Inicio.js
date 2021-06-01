
import React, { useState , useEffect} from 'react';
import{moverCuca, moverCuca2, moverCuca3, reset} from '../actions/index.js'
import { connect } from "react-redux";
import './Inicio.css'
/* import pointer from './pointer.js' */

    const Inicio = (props) => {     
      const [segundos, setSegundos] = useState(0);
      const [activo, setActivo] = useState(false);
      const [nightMode, setNightMode] = useState(false);
      const [nightDay, setNightDay] = useState('Night');
      const [cucas, setCucas] = useState(20);
      const [dificulty, setDificulty] = useState('Hard')
      const [direction, setDirection] = useState('N')
      const [pos, setPos] = useState({
        x: window.innerHeight/2,
        y: window.innerWidth/2
      })
      var randomizePos = function(){
        var x;
        var y; 
        x = Math.round(Math.random()*window.innerHeight)/10*7 + Math.round(Math.random()*window.innerHeight)/10
        y = Math.round(Math.random()*window.innerWidth)/10*9
        return {x, y}
      }
      var randomizeDir = function(){
        var n = Math.random()
        if (n > 0 && n < 0.25){
          setDirection('N')
        }
        if (n > 0.25 && n < 0.5){
          setDirection('S')
        }
        if (n > 0.5 && n < 0.75){
          setDirection('E')
        }
        if (n > 0.75 && n < 1){
          setDirection('O')
        }
      }
      useEffect(() => {      
        let intervalo2 = null;
        let intervalo = null;
/*         if(activo && dificulty === 'Easy'){
        intervalo2 = setInterval(() => {
          props.moverCuca()
        }, 700)
        } */
        if(activo){
          intervalo = setInterval(() => {  
            if(dificulty === 'Hard'){
              if(segundos.toFixed(2) - segundos.toFixed(0) === 0){
                randomizeDir()
              }
              if(direction === 'N'){
                if(pos.x > window.innerHeight/10*8){
                  setDirection('S')
                }
                setPos({
                  ...pos,
                  x: pos.x + 1
                })             
              }   
              if(direction === 'S'){
                if(pos.x < 25){
                  setDirection('N')
                }
                setPos({
                  ...pos,
                  x: pos.x - 1
                })             
              }   
              if(direction === 'E'){
                if(pos.y < 25){
                  setDirection('O')
                }
                setPos({
                  ...pos,
                  y: pos.y - 1
                })             
              }   
              if(direction === 'O'){
                if(pos.y > window.innerWidth/10*8){
                  setDirection('E')
                }
                setPos({
                  ...pos,
                  y: pos.y + 1
                })             
              }
            }
              if (dificulty === 'Easy'){
                if(segundos.toFixed(2) - segundos.toFixed(0) === 0){
                  randomizeDir()
                }
                if(direction === 'N'){
                  if(pos.x > window.innerHeight/10*8){
                    setDirection('S')
                  }
                  setPos({
                    ...pos,
                    x: pos.x + 2
                  })             
                }   
                if(direction === 'S'){
                  if(pos.x < 25){
                    setDirection('N')
                  }
                  setPos({
                    ...pos,
                    x: pos.x - 2
                  })             
                }   
                if(direction === 'E'){
                  if(pos.y < 25){
                    setDirection('O')
                  }
                  setPos({
                    ...pos,
                    y: pos.y - 2
                  })             
                }   
                if(direction === 'O'){
                  if(pos.y > window.innerWidth/10*8){
                    setDirection('E')
                  }
                  setPos({
                    ...pos,
                    y: pos.y + 2
                  })             
                }
              } 
                       
/*               if(segundos > 5 && segundos.toFixed(2) - segundos.toFixed(0) === 0.5){
                props.moverCuca2()                
              }
              if(segundos > 10 && segundos.toFixed(2) - segundos.toFixed(0) === 0.2){
                props.moverCuca3()                
              } */
                
            setSegundos(segundos => segundos + 0.01);
          }, 10)             
        }
        if(cucas === 0){
          alert('Tardaste ' + segundos.toFixed(2) + ' segundos en exterminar a las cucas')
          clearInterval(intervalo);
          setActivo(false);
          setSegundos(0);
          setCucas(20);
          props.reset();
          setPos({
            x: window.innerHeight/2,
            y: window.innerWidth/2
          })
        } 

        if(segundos >= 20){
          alert('Demasiado lento.. las cucas escaparon!')
          clearInterval(intervalo);
          clearInterval(intervalo2);
          setActivo(false);
          setSegundos(0);
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
      }, [activo, segundos, cucas])


 /*      let toggle = function() {
        setActivo(true);
        setSegundos(30);
        props.reset()
      }  */
      let toggleNight = function() {
        setNightMode(!nightMode);
        if(nightMode){
          setNightDay('Night')
        }
        else setNightDay('Day')
      }    
      let toggleDif = function(){
        if(dificulty === 'Easy')
        setDificulty('Hard')
        else setDificulty('Easy')
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
    }
/*     let handleHit2 = function(){
      setCucas(cucas - 1);
      props.moverCuca2();
    }
    let handleHit3 = function(){
      setCucas(cucas - 1);
      props.moverCuca3();
    } */
    
    
  
      return (
        <div className={nightMode &&  'container'} onMouseMove={handleMouseMove}>

            <div id="follower" className= 'follower'>
              <div id="circle1" className= 'circle1'>
            </div>
          </div> 
          <div className ='bar' >      
            <span className='barText' >Cucas: {cucas}</span>        
            <span className='barText' >Time: {segundos.toFixed(2)} s</span>
            <button className = 'button' onClick = {() => {
              props.reset()
              setSegundos(0)
              setCucas(20)
              setActivo(false)
              setPos({
                x: window.innerHeight/2,
                y: window.innerWidth/2
              })
            }}>Reset</button>          
{/*             <button className = 'button' onClick = {() => toggle()} >Start</button>   */}
            {(window.innerWidth > 500) ? <button className = 'button' onClick = {() => toggleNight()}>{nightDay}</button> : null }
            <button className = 'button' onClick = {() => toggleDif()}>{dificulty}</button>  
          </div>
{/*           {(dificulty === 'Easy' && segundos > 5 && cucas > 1) ? <button className = 'cuca' onClick={() =>handleHit2()} style={{position: 'absolute', bottom: (props.cucaPos2.x), right: props.cucaPos2.y}}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg></button> : null}
            {(dificulty === 'Easy' && segundos > 10 && cucas > 2) ? (<button className = 'cuca' onClick={() =>handleHit3()} style={{position: 'absolute', bottom: (props.cucaPos3.x), right: props.cucaPos3.y}}><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg></button>) : null} */}
          {cucas > 0 ? <div className = 'cucaBlock'>
            <button className = 'cuca' onClick={() =>handleHit()} style={{position: 'absolute', bottom: (pos.x), right: (pos.y)}}><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg>{!activo && 'Start'}</button>
          </div> : null}
            
        </div>
      );
    }    
  

function mapStateToProps (state){
    return {
      cucaPos: state.cucaPos,
      cucaPos2: state.cucaPos2,
      cucaPos3: state.cucaPos3,
    }
  }
  function mapDispatchToProps (dispatch){
    return {
      moverCuca: () => dispatch(moverCuca()),
      moverCuca2: () => dispatch(moverCuca2()),
      moverCuca3: () => dispatch(moverCuca3()),
      reset: () => dispatch(reset()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Inicio);