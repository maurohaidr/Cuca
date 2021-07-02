import axios from 'axios'
export const MOVER_CUCA = "MOVER_CUCA";
export const RESET = "RESET";
export const GET_SCORES = 'GET_SCORES'

export function moverCuca() {
    return { type: MOVER_CUCA };
}

export function reset(){
    return { type: RESET }
}

export function getScores() {
    return async function(dispatch) {
      const result = await axios.get("https://cuca-server.herokuapp.com/hightscores");
      dispatch({ type: GET_SCORES, payload: result.data });
    };
}
export function postScore(data) {
    return function(){
    axios.post("https://cuca-server.herokuapp.com/postScore", data);
    }
};




  
  