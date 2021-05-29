

export const MOVER_CUCA = "MOVER_CUCA";
export const START = "START";
export const RESET = "RESET";
export function moverCuca() {
    return { type: MOVER_CUCA };
  }
export function reset(){
  return { type: RESET }
}
export function start(){
  return{ type: START }
}


  
  