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
        timer: 0,
        hits: 0
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
    return state;
  }
  
  export default rootReducer;