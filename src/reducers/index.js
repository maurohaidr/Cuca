const initialState = {
  cucaPos:{
    x: window.innerHeight/2,
    y: window.innerWidth/2,
  },
  hits:0,
  };

  function pos(){
        var x;
        var y; 
        x = Math.round(Math.random()*window.innerHeight)/10*7
        y = Math.round(Math.random()*window.innerWidth)/10*9
        return {x, y}
  }
  function rootReducer(state = initialState, action) {
    
    if (action.type === "MOVER_CUCA") {

        return {
          ...state,
          cucaPos: pos(),
          hits: state.hits + 1,
        }
      }
    if (action.type === "RESET") {
      return {
        ...state,
        hits: 0,
        cucaPos:{
          x: window.innerHeight/2,
          y: window.innerWidth/2,
        },
      }
    }
    if(action.type === "START"){
      var startTimer = function(){
        state.timer++
      }
        return{
        ...state,
        timer: setInterval(startTimer(), 1000)
        }
  }
    if(action.type === "LINTERNA"){
      var f = function() {
        var follower, init, mouseX, mouseY, positionElement, printout, timer;      
        follower = document.getElementById('follower');      
        printout = document.getElementById('printout');      
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
      }.call(this);
    }
    return state;
  }
  
  export default rootReducer;