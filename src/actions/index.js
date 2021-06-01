

export const MOVER_CUCA = "MOVER_CUCA";
export const START = "START";
export const RESET = "RESET";
export const LINTERNA = "LINTERNA";
export const MOVER_CUCA2 ='MOVER_CUCA2';
export const MOVER_CUCA3 ='MOVER_CUCA3';
export function moverCuca() {
    return { type: MOVER_CUCA };
}
export function moverCuca2() {
    return { type: MOVER_CUCA2 };
}
export function moverCuca3() {
  return { type: MOVER_CUCA3 };
}
export function reset(){
  return { type: RESET }
}




  
  