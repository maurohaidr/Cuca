const initialState = {
  cucaPos:{
    x: window.innerHeight/2,
    y: window.innerWidth/2,
  },
  cucaPos2:{
    x: window.innerHeight/2,
    y: window.innerWidth/2,
  },
  cucaPos3:{
    x: window.innerHeight/2,
    y: window.innerWidth/2,
  },
  };

  function pos(){
        var x;
        var y; 
        x = Math.round(Math.random()*window.innerHeight)/10*7 + Math.round(Math.random()*window.innerHeight)/10
        y = Math.round(Math.random()*window.innerWidth)/10*9
        return {x, y}
  }

  function rootReducer(state = initialState, action) {
    
    if (action.type === "MOVER_CUCA") {

        return {
          ...state,
          cucaPos: pos(),
        }
      }
    if (action.type === "MOVER_CUCA2") {

        return {
          ...state,
          cucaPos2: pos(),
        }
    }
    if (action.type === "MOVER_CUCA3") {

      return {
        ...state,
        cucaPos3: pos(),
      }
  }
    if (action.type === "RESET") {
      return {
        ...state,
        cucaPos:{
          x: window.innerHeight/2,
          y: window.innerWidth/2,
        },
      }
    }
    return state;
  }
  
  export default rootReducer;