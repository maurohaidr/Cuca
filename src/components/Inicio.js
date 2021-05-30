
import React, { useState , useEffect} from 'react';
import{moverCuca, reset} from '../actions/index.js'
import { connect } from "react-redux";
import './Inicio.css'
/* import pointer from './pointer.js' */

    const Inicio = (props) => {     
      
      const [segundos, setSegundos] = useState(30);
      const [activo, setActivo] = useState(false);
      const [nightMode, setNightMode] = useState(false);
      const [nightDay, setNightDay] = useState('Night')
      useEffect(() => {      
                
        let intervalo = null;
        if(activo){
          intervalo = setInterval(() => {
            setSegundos(segundos => segundos - 1);
          }, 1000)
        }
        if(segundos === 0){
          alert('Golpeaste la cuca ' + props.hits + ' veces')
          clearInterval(intervalo);
          setActivo(false);
          setSegundos(30);
          props.reset();
        } 
          
        return () => clearInterval(intervalo);
      }, [activo, segundos])


      let toggle = function() {
        setActivo(true);
        setSegundos(30);
        props.reset()
      } 
      let toggleNight = function() {
        setNightMode(!nightMode);
        if(nightMode){
          setNightDay('Night')
        }
        else setNightDay('Day')
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

      props.moverCuca()
      setActivo(true);
    }
    
  
      return (
        <div className={nightMode && 'container'} onMouseMove={handleMouseMove}>
            <div id="follower">
              <div id="circle1">
            </div>
          </div> 
          <div className ='bar' >      
            <span className='barText' >Hits: {props.hits}</span>        
            <span className='barText' >Tiempo: {segundos} s</span>
            <button className = 'button' onClick = {() => {
              props.reset()
              setSegundos(30)
              setActivo(false)
            }}>Reset</button>          
{/*             <button className = 'button' onClick = {() => toggle()} >Start</button>   */}
            <button className = 'button' onClick = {() => toggleNight()}>{nightDay}</button>  
          </div>
           
          <div className = 'cucaBlock'>
            <button className = 'cuca' onClick={() =>handleHit()} style={{position: 'absolute', bottom: (props.cucaPos.x), right: props.cucaPos.y}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bug" viewBox="0 0 16 16">
            <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A4.979 4.979 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A4.985 4.985 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623zM4 7v4a4 4 0 0 0 3.5 3.97V7H4zm4.5 0v7.97A4 4 0 0 0 12 11V7H8.5zM12 6a3.989 3.989 0 0 0-1.334-2.982A3.983 3.983 0 0 0 8 2a3.983 3.983 0 0 0-2.667 1.018A3.989 3.989 0 0 0 4 6h8z"/>
            </svg>{!activo && 'Hit'}</button>
          </div>  
        </div>
      );
    }    
  

function mapStateToProps (state){
    return {
      cucaPos: state.cucaPos,
      hits: state.hits,
      timer: state.timer
    }
  }
  function mapDispatchToProps (dispatch){
    return {
      moverCuca: () => dispatch(moverCuca()),
      reset: () => dispatch(reset()),
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(Inicio);